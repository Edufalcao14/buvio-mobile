import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import {
  matchSchema,
  MatchFormValues,
} from "@/features/match/schemas/CreateMatchValidation";
import { getErrorMessage } from "@/lib/errors";
import {
  MatchType,
  useCreateMatchMutation,
  useGetTeamMembersQuery,
} from "@/graphql/generated/hooks";

export const useCreateMatchViewModel = (onClose?: () => void) => {
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const { data: getTeamMembers } = useGetTeamMembersQuery();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      name: "",
      type: MatchType.Amical,
      date: new Date(),
    },
    mode: "onChange",
  });

  const matchType = useWatch({ control, name: "type" });
  const [createMatch, { loading: isCreating }] = useCreateMatchMutation();

  const handleMatchCreate = async (data: MatchFormValues) => {
    try {
      const result = await createMatch({
        variables: {
          name: data.name,
          date: data.date,
          type: data.type,
        },
        update: (cache, { data: created }) => {
          const teamId = created?.createMatch?.team?.id;

          if (!teamId) {
            return;
          }

          // Evicted on the Team, not on the root query. `matches` lives on
          // Team in the schema, and an eviction with no `id` targets
          // ROOT_QUERY - so the previous form matched nothing at all and the
          // history list silently never refreshed after a match was created.
          cache.evict({
            id: cache.identify({ __typename: "Team", id: teamId }),
            fieldName: "matches",
          });
          cache.gc();
        },
      });

      if (result.errors) {
        throw { graphQLErrors: result.errors };
      }

      Toast.show({
        type: "success",
        text1: "Match créé avec succès",
        position: "bottom",
        visibilityTime: 2000,
      });

      resetForm();
      onClose?.();
    } catch (error) {
      setError(getErrorMessage(error));

      Toast.show({
        type: "error",
        text1: "Erreur lors de la création du match",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const handleTypeSelection = (type: MatchType) => {
    setValue("type", type, { shouldValidate: true });
  };

  const resetForm = () => {
    reset({
      name: "",
      type: MatchType.Amical,
      date: new Date(),
    });
  };

  return {
    isCreating,
    control,
    errors,
    error,
    isValid,
    matchType,
    showCalendar,
    setShowCalendar,
    handleTypeSelection,
    handleSubmit: handleSubmit(handleMatchCreate),
    resetForm,
    getTeamMembers,
  };
};
