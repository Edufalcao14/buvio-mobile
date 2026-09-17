import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import {
  UserInputForms,
  userInputSchema,
} from "@/features/auth/schemas/SignUpValidation";
import { useAuth } from "@/providers/AuthProvider";
import { getErrorMessage } from "@/lib/errors";
import {
  pickImage,
  useImageUpload,
  type PreparedImage,
} from "@/hooks/useImageUpload";

export const useSignUpViewModel = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<PreparedImage | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputForms>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      displayName: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUp } = useAuth();
  const { upload } = useImageUpload("avatar");
  const router = useRouter();

  /**
   * Here the picture is only chosen and shrunk. Signing an upload URL needs an
   * authenticated caller, so no byte can leave the phone before the account
   * exists (backend ADR 0003).
   */
  const chooseAvatar = useCallback(async () => {
    setAvatarError(null);

    try {
      const picked = await pickImage();

      if (picked) {
        setAvatar(picked);
      }
    } catch (cause) {
      setAvatarError(
        cause instanceof Error
          ? cause.message
          : "Cette image n’a pas pu être préparée. Choisis-en une autre."
      );
    }
  }, []);

  const removeAvatar = useCallback(() => {
    setAvatar(null);
    setAvatarError(null);
  }, []);

  const handleSubmitSignUp = async (data: UserInputForms) => {
    try {
      setLoading(true);
      setError("");

      await signUp(data.email, data.password, data.displayName, data.nickname);

      /*
       * The account first, the avatar immediately after, while the app already
       * holds the token. A picture that does not make it must never cost a
       * sign-up: the player is told the account exists and that the photo can
       * be added later.
       */
      if (avatar) {
        const outcome = await upload(avatar);

        if (outcome.status === "failed") {
          Toast.show({
            type: "info",
            text1: "Compte créé, photo non envoyée",
            text2: "Tu pourras l’ajouter dans les réglages.",
            position: "bottom",
            visibilityTime: 4000,
          });
        }
      }

      router.push("/welcome");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    errors,
    loading,
    error,
    avatarUri: avatar?.uri ?? null,
    avatarError,
    chooseAvatar,
    removeAvatar,
    handleSubmit: handleSubmit(handleSubmitSignUp),
  };
};
