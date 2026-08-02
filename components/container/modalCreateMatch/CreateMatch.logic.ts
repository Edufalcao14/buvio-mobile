import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { matchSchema, MatchFormValues } from "./createMatchModalValidation";
import { MatchType } from "../../../graphql/generated/hooks";
import {
  useCreateMatchMutation,
  useGetTeamMembersQuery,
} from "../../../graphql/generated/hooks";

export const useCreateMatchModal = (onClose?: () => void) => {
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const { data: getTeamMembers } = useGetTeamMembersQuery();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      name: "",
      type: MatchType.Amical,
      date: new Date(),
    },
    mode: "onChange",
  });

  const matchType = watch("type");
  const [createMatch] = useCreateMatchMutation();

  const handleMatchCreate = async (data: MatchFormValues) => {
    try {
      const result = await createMatch({
        variables: {
          name: data.name,
          date: data.date,
          type: data.type,
        },
        update: (cache) => {
          cache.evict({ fieldName: "matches" });
          cache.gc();
        },
      });

      if (result.errors) {
        throw new Error(result.errors[0].message);
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
      setError(
        error instanceof Error ? error.message : "Une erreur s'est produite"
      );

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

  const getInitials = (name: string): string => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return name.substring(0, 2).toUpperCase();
  };

  return {
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
    getInitials,
    getTeamMembers,
  };
};
