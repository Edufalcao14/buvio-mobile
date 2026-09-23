import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import {
  createTeamInputForms,
  createTeamInputSchema,
} from "@/features/team/schemas/CreateTeamValidation";
import { useCreateTeamMutation } from "@/graphql/generated/hooks";
import { getErrorMessage } from "@/lib/errors";
import {
  PreparedImage,
  pickImage,
  useImageUpload,
} from "@/hooks/useImageUpload";
import { t } from "@/i18n";

export const useCreateTeamViewModel = () => {
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createTeamInputForms>({
    resolver: zodResolver(createTeamInputSchema),
    defaultValues: {
      name: "",
      sport: "",
    },
  });

  const [createTeam, { loading: isLoading }] = useCreateTeamMutation();
  const router = useRouter();

  /*
   * The crest is chosen here but uploaded after the team exists: a signed
   * upload key lives under `crests/<teamId>/`, so there is nothing to sign
   * until the team has an id (see the backend's ADR 0003).
   */
  const [crest, setCrest] = useState<PreparedImage | null>(null);
  const {
    upload,
    isUploading,
    errorMessage: crestError,
  } = useImageUpload("crest");

  const chooseCrest = async () => {
    const picked = await pickImage();

    if (picked) {
      setCrest(picked);
    }
  };

  const handleTeamCreate = async (data: createTeamInputForms) => {
    try {
      const result = await createTeam({
        variables: {
          name: data.name,
          sport: data.sport !== "" ? data.sport : null,
        },
        update: (cache) => {
          cache.evict({ fieldName: "me" });
          cache.gc();
        },
      });
      if (result.errors) {
        // Rethrown whole: flattening to a string drops extensions.errorCode,
        // which is the only thing that maps this to French copy.
        throw { graphQLErrors: result.errors };
      }

      // A crest that fails to upload must not cost the team: the squad exists,
      // and the badge can be set later from the settings screen.
      if (crest) {
        const uploaded = await upload(crest);

        if (uploaded.status === "failed") {
          Toast.show({
            type: "warning",
            text1: t("team.create.toastCrestFailed"),
            text2: t("auth.signUp.toastAddLater"),
            position: "bottom",
            visibilityTime: 3000,
          });
          router.replace("/(tabs)/team");
          return;
        }
      }

      Toast.show({
        type: "success",
        text1: t("team.create.toastCreated"),
        position: "bottom",
        visibilityTime: 2000,
      });
      router.replace("/(tabs)/team");
    } catch (error) {
      setError(getErrorMessage(error));
      Toast.show({
        type: "error",
        text1: t("team.create.toastError"),
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return {
    control,
    errors,
    error,
    isLoading: isLoading || isUploading,
    crestUri: crest?.uri ?? null,
    crestError,
    chooseCrest,
    handleSubmit: handleSubmit(handleTeamCreate),
  };
};
