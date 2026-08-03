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

export const useCreateTeamFormLogic = () => {
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

  const handleTeamCreate = async (data: createTeamInputForms) => {
    try {
      const result = await createTeam({
        variables: {
          name: data.name,
          sport: data.sport !== "" ? data.sport : null,
        },
        update: (cache) => {
          
          cache.evict({ fieldName: 'me' });
          cache.gc();
        }
      });
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      Toast.show({
        type: "success",
        text1: "Équipe créée avec succès",
        position: "bottom",
        visibilityTime: 2000,
      });
      router.push("/(tabs)/team");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur s'est produite"
      );
      Toast.show({
        type: "error",
        text1: "Erreur lors de la création de l'équipe",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return {
    control,
    errors,
    error,
    isLoading,
    handleSubmit: handleSubmit(handleTeamCreate),
  };
};
