import { useCallback, useState } from "react";
import { Alert, Clipboard, Share } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { useAuth } from "@/providers/AuthProvider";
import { useUpdateProfileMutation } from "@/graphql/generated/hooks";
import { useImageUpload } from "@/hooks/useImageUpload";
import { getErrorMessage } from "@/lib/errors";
import { nicknameOf } from "@/utils/identity";
import {
  ProfileForms,
  profileSchema,
} from "@/features/settings/schemas/ProfileValidation";

export const useSettingsViewModel = () => {
  const { userData, logout } = useAuth();

  const team = userData?.team ?? null;

  /*
   * Only the player who created the team may set its crest, so a non-creator
   * is never shown the control: an action you cannot take does not belong on
   * the screen at all.
   */
  const isTeamCreator = Boolean(
    userData?.id && team?.creator?.id && team.creator.id === userData.id,
  );

  const [updateProfile, { loading: isSavingProfile }] =
    useUpdateProfileMutation();
  const [profileError, setProfileError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileForms>({
    resolver: zodResolver(profileSchema),
    values: {
      displayName: userData?.displayName ?? "",
      nickname: userData?.nickname ?? "",
    },
  });

  const avatarUpload = useImageUpload("avatar");
  const crestUpload = useImageUpload("crest");

  // The confirm mutations return the very objects the `Me` query points at, so
  // the normalised cache refreshes the header and this screen on its own.
  const changeAvatar = useCallback(async () => {
    const outcome = await avatarUpload.pickAndUpload();

    if (outcome.status === "uploaded") {
      Toast.show({
        type: "success",
        text1: "Photo de profil mise à jour",
        position: "bottom",
        visibilityTime: 1800,
      });
    }
  }, [avatarUpload]);

  const changeCrest = useCallback(async () => {
    const outcome = await crestUpload.pickAndUpload();

    if (outcome.status === "uploaded") {
      Toast.show({
        type: "success",
        text1: "Blason mis à jour",
        position: "bottom",
        visibilityTime: 1800,
      });
    }
  }, [crestUpload]);

  const saveProfile = handleSubmit(async (data: ProfileForms) => {
    setProfileError(null);

    try {
      const result = await updateProfile({
        variables: {
          displayName: data.displayName.trim(),
          // An empty field is sent as an empty string on purpose: that is how
          // the backend clears a nickname and restores the fallback.
          nickname: data.nickname.trim(),
        },
      });

      if (result.errors?.length) {
        setProfileError(getErrorMessage({ graphQLErrors: result.errors }));
        return;
      }

      reset({
        displayName: result.data?.updateProfile.displayName ?? data.displayName,
        nickname: result.data?.updateProfile.nickname ?? "",
      });

      Toast.show({
        type: "success",
        text1: "Profil mis à jour",
        position: "bottom",
        visibilityTime: 1800,
      });
    } catch (cause) {
      setProfileError(getErrorMessage(cause));
    }
  });

  const copyCode = useCallback(() => {
    if (!team?.code) {
      return;
    }

    Clipboard.setString(team.code);

    Toast.show({
      type: "success",
      text1: `Code ${team.code} copié`,
      position: "bottom",
      visibilityTime: 1800,
    });
  }, [team]);

  const shareCode = useCallback(async () => {
    if (!team?.code) {
      return;
    }

    await Share.share({
      message: `Rejoins ${team.name} sur Buvio avec le code ${team.code}`,
    });
  }, [team]);

  // Signing out drops the whole session, so it asks first: a mis-tap here
  // costs the user their place in the app, not a screen.
  const confirmLogout = useCallback(() => {
    Alert.alert(
      "Se déconnecter ?",
      "Tu devras entrer ton email et ton mot de passe pour revenir.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/");
          },
        },
      ],
    );
  }, [logout]);

  return {
    displayName: userData?.displayName ?? null,
    email: userData?.email ?? null,
    // The name the squad reads, fallback included — what the podiums show.
    squadName: userData
      ? nicknameOf({
          displayName: userData.displayName,
          nickname: userData.nickname,
        })
      : null,
    avatarUrl: userData?.avatarUrl ?? null,
    control,
    errors,
    isDirty,
    isSavingProfile,
    profileError,
    saveProfile,
    isUploadingAvatar: avatarUpload.isUploading,
    avatarError: avatarUpload.errorMessage,
    changeAvatar,
    isTeamCreator,
    isUploadingCrest: crestUpload.isUploading,
    crestError: crestUpload.errorMessage,
    changeCrest,
    team: team
      ? {
          name: team.name,
          code: team.code,
          sport: team.sport ?? null,
          crestUrl: team.crestUrl ?? null,
        }
      : null,
    copyCode,
    shareCode,
    confirmLogout,
    goBack: () => router.back(),
  };
};
