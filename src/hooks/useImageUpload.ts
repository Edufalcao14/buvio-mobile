import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import {
  useConfirmAvatarUploadMutation,
  useConfirmTeamCrestUploadMutation,
  useCreateAvatarUploadUrlMutation,
  useCreateTeamCrestUploadUrlMutation,
} from "@/graphql/generated/hooks";
import { getErrorMessage } from "@/lib/errors";

/**
 * Picking, shrinking and uploading one picture — an avatar or a team crest.
 *
 * The bytes never pass through our server (backend ADR 0003): the app asks for
 * a pre-signed ticket, PUTs the image straight to the bucket, then confirms
 * the key, and only that confirmation attaches the picture. Because signing
 * requires an authenticated caller, `pick` and `upload` are separate steps —
 * sign-up picks before the account exists and uploads right after it does.
 *
 * A phone picture is 5–10 MB and an avatar needs a few dozen KB, so the resize
 * happens here, on the device, before a single byte leaves it.
 */

/** The longest edge of a stored picture. Beyond this nothing is visible. */
const MAX_DIMENSION = 512;

/** The backend's ceiling. The ladder below exists so we never reach it. */
const MAX_BYTES = 1024 * 1024;

/**
 * Quality steps tried in order until the file fits. A 512px JPEG at 0.8 is
 * ~50 KB, so the lower rungs are a safety net, not the normal path.
 */
const QUALITY_LADDER = [0.8, 0.6, 0.4, 0.2];

/** The only type we ever produce, and one the backend accepts. */
const CONTENT_TYPE = "image/jpeg";

export type ImageUploadTarget = "avatar" | "crest";

/** A picture already shrunk on the device and ready to be PUT. */
export type PreparedImage = {
  uri: string;
  contentType: string;
};

export type ImageUploadResult =
  | { status: "uploaded"; url: string | null }
  | { status: "cancelled" }
  | { status: "failed"; message: string };

const PERMISSION_DENIED =
  "Buvio n’a pas accès à tes photos. Autorise l’accès dans les réglages du téléphone.";
const PREPARE_FAILED =
  "Cette image n’a pas pu être préparée. Choisis-en une autre.";
const TRANSFER_FAILED =
  "L’envoi de la photo a échoué. Vérifie ta connexion et réessaie.";
const TOO_LARGE =
  "Cette image reste trop lourde même réduite. Choisis-en une autre.";

/**
 * A failure this module already phrased for the player. Anything else is a
 * server or network error and goes through `getErrorMessage`.
 */
class ImageUploadError extends Error {}

/** `null` means the player closed the library without choosing. */
export const pickImage = async (): Promise<PreparedImage | null> => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new ImageUploadError(PERMISSION_DENIED);
  }

  const picked = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    selectionLimit: 1,
  });

  if (picked.canceled || !picked.assets?.[0]) {
    return null;
  }

  const asset = picked.assets[0];

  // Only the longer edge is pinned; the other follows the ratio, so a crop is
  // never forced on a picture the player already framed.
  const isLandscape = (asset.width ?? 0) >= (asset.height ?? 0);
  const target = isLandscape
    ? { width: Math.min(MAX_DIMENSION, asset.width || MAX_DIMENSION) }
    : { height: Math.min(MAX_DIMENSION, asset.height || MAX_DIMENSION) };

  const rendered = await ImageManipulator.manipulate(asset.uri)
    .resize(target)
    .renderAsync();

  for (const compress of QUALITY_LADDER) {
    const saved = await rendered.saveAsync({
      compress,
      format: SaveFormat.JPEG,
    });

    const blob = await (await fetch(saved.uri)).blob();

    if (blob.size <= MAX_BYTES) {
      return { uri: saved.uri, contentType: CONTENT_TYPE };
    }
  }

  throw new ImageUploadError(TOO_LARGE);
};

export const useImageUpload = (target: ImageUploadTarget) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createAvatarTicket] = useCreateAvatarUploadUrlMutation();
  const [confirmAvatar] = useConfirmAvatarUploadMutation();
  const [createCrestTicket] = useCreateTeamCrestUploadUrlMutation();
  const [confirmCrest] = useConfirmTeamCrestUploadMutation();

  const clearError = useCallback(() => setErrorMessage(null), []);

  /** The signed permission to PUT one object, for whichever picture this is. */
  const requestTicket = useCallback(
    async (contentType: string) => {
      if (target === "avatar") {
        const result = await createAvatarTicket({ variables: { contentType } });

        if (result.errors?.length) {
          throw result.errors[0];
        }

        return result.data?.createAvatarUploadUrl ?? null;
      }

      const result = await createCrestTicket({ variables: { contentType } });

      if (result.errors?.length) {
        throw result.errors[0];
      }

      return result.data?.createTeamCrestUploadUrl ?? null;
    },
    [target, createAvatarTicket, createCrestTicket],
  );

  /**
   * The step that actually attaches the picture; an uploaded object that is
   * never confirmed is garbage the bucket collects. Resolves with the URL the
   * server now serves.
   */
  const confirmKey = useCallback(
    async (key: string) => {
      if (target === "avatar") {
        const result = await confirmAvatar({ variables: { key } });

        if (result.errors?.length) {
          throw result.errors[0];
        }

        return result.data?.confirmAvatarUpload.avatarUrl ?? null;
      }

      const result = await confirmCrest({ variables: { key } });

      if (result.errors?.length) {
        throw result.errors[0];
      }

      return result.data?.confirmTeamCrestUpload.crestUrl ?? null;
    },
    [target, confirmAvatar, confirmCrest],
  );

  /**
   * Ticket → PUT → confirm. Returns the attached URL, or a message that names
   * what went wrong. It never throws and always releases `isUploading`, so a
   * failure leaves the screen usable rather than stuck on a spinner.
   */
  const upload = useCallback(
    async (image: PreparedImage): Promise<ImageUploadResult> => {
      setIsUploading(true);
      setErrorMessage(null);

      try {
        const ticket = await requestTicket(image.contentType);

        if (!ticket) {
          throw new ImageUploadError(TRANSFER_FAILED);
        }

        const blob = await (await fetch(image.uri)).blob();
        const response = await fetch(ticket.uploadUrl, {
          method: "PUT",
          body: blob,
          headers: { "Content-Type": image.contentType },
        });

        if (!response.ok) {
          throw new ImageUploadError(TRANSFER_FAILED);
        }

        return { status: "uploaded", url: await confirmKey(ticket.key) };
      } catch (cause) {
        const message =
          cause instanceof ImageUploadError
            ? cause.message
            : getErrorMessage(cause);

        setErrorMessage(message);

        return { status: "failed", message };
      } finally {
        setIsUploading(false);
      }
    },
    [requestTicket, confirmKey],
  );

  /** Library → resize → upload, for the screens that do both at once. */
  const pickAndUpload = useCallback(async (): Promise<ImageUploadResult> => {
    setErrorMessage(null);

    let image: PreparedImage | null;

    try {
      image = await pickImage();
    } catch (cause) {
      const message =
        cause instanceof ImageUploadError ? cause.message : PREPARE_FAILED;

      setErrorMessage(message);

      return { status: "failed", message };
    }

    if (!image) {
      return { status: "cancelled" };
    }

    return upload(image);
  }, [upload]);

  return {
    isUploading,
    errorMessage,
    clearError,
    pickImage,
    upload,
    pickAndUpload,
  };
};
