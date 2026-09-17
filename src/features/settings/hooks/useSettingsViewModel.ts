import { useCallback, useState } from "react";
import { Alert, Clipboard, Share } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { useAuth } from "@/providers/AuthProvider";
import {
  useDeleteAccountMutation,
  useUpdateProfileMutation,
} from "@/graphql/generated/hooks";
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
    userData?.id && team?.creator?.id && team.creator.id === userData.id
  );

  const [updateProfile, { loading: isSavingProfile }] =
    useUpdateProfileMutation();
  const [deleteAccountMutation, { loading: isDeletingAccount }] =
    useDeleteAccountMutation();
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
      ]
    );
  }, [logout]);

  /**
   * Deleting an account is irreversible and takes the player's history with
   * it, so it asks twice: once for the intent, once to be sure. Apple requires
   * this path to exist at all (Guideline 5.1.1(v)); asking twice is what keeps
   * a mis-tap from being final.
   */
  const confirmDeleteAccount = useCallback(() => {
    Alert.alert(
      "Supprimer ton compte ?",
      "Ton nom, ton pseudo, ta photo et ta place dans l'équipe seront effacés. Cette action est définitive.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Continuer",
          style: "destructive",
          onPress: () =>
            Alert.alert(
              "C'est définitif",
              "Tu ne pourras pas récupérer ton compte. On y va ?",
              [
                { text: "Annuler", style: "cancel" },
                {
                  text: "Supprimer définitivement",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      const result = await deleteAccountMutation();

                      if (result.errors?.length) {
                        Toast.show({
                          type: "error",
                          text1: "Suppression impossible",
                          text2: getErrorMessage({
                            graphQLErrors: result.errors,
                          }),
                          position: "bottom",
                        });
                        return;
                      }

                      // The server has already invalidated every token, so the
                      // local session is dead either way - clearing it is what
                      // gets the player back to a usable screen.
                      await logout();
                      router.replace("/");
                    } catch (cause) {
                      Toast.show({
                        type: "error",
                        text1: "Suppression impossible",
                        text2: getErrorMessage(cause),
                        position: "bottom",
                      });
                    }
                  },
                },
              ]
            ),
        },
      ]
    );
  }, [deleteAccountMutation, logout]);

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
    isDeletingAccount,
    confirmDeleteAccount,
    goBack: () => router.back(),
  };
};
