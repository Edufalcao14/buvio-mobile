import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { UserInputForms, userInputSchema } from "./JoinTeamValidation";
import { useJoinTeamMutation } from "../../graphql/generated/hooks";
import { useValidateTeamCodeQuery } from "../../graphql/generated/hooks";
import { useApolloClient } from "@apollo/client";
import Toast from "react-native-toast-message";

export const useJoinTeamForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInputForms>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const [join] = useJoinTeamMutation();
  const { data: validationData } = useValidateTeamCodeQuery({
    variables: { code: watch('code') },
    skip: !watch('code')
  });
  const router = useRouter();

  const handleJoinTeam = async (data: UserInputForms) => {
    try {
      setLoading(true);
      setError("");

      if (!validationData?.validateTeamCode) {
        Toast.show({
          type: "error",
          text1: `Aucune équipe trouvée avec le code ${data.code}`,
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }

      const team = await join({ variables: { code: data.code } });
      client.resetStore();

      Toast.show({
        type: "success",
        text1: `Vous avez rejoint l'équipe ${team.data?.joinTeam.name} avec succès.`,
        position: "bottom",
        visibilityTime: 2000,
      });

      router.push("/(tabs)/team");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur s'est produite"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    errors,
    loading,
    error,
    watch,
    handleSubmit: handleSubmit(handleJoinTeam),
  };
};
