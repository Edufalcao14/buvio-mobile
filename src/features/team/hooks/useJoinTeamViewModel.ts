import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import {
  UserInputForms,
  userInputSchema,
} from "@/features/team/schemas/JoinTeamValidation";
import {
  useJoinTeamMutation,
  useValidateTeamCodeQuery,
} from "@/graphql/generated/hooks";
import { useApolloClient } from "@apollo/client";
import Toast from "react-native-toast-message";
import { getErrorMessage } from "@/lib/errors";

export const useJoinTeamViewModel = () => {
  const [error, setError] = useState("");
  const client = useApolloClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputForms>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const [join, { loading }] = useJoinTeamMutation();
  const code = useWatch({ control, name: "code" });
  const { data: validationData } = useValidateTeamCodeQuery({
    variables: { code },
    skip: !code,
  });
  const router = useRouter();

  const handleJoinTeam = async (data: UserInputForms) => {
    try {
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
      setError(getErrorMessage(error));
    }
  };

  return {
    control,
    errors,
    loading,
    error,
    code,
    handleSubmit: handleSubmit(handleJoinTeam),
  };
};
