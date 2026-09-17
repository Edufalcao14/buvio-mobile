import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import {
  UserInputForms,
  userInputSchema,
} from "@/features/auth/schemas/SignInValidation";
import { useAuth } from "@/providers/AuthProvider";
import { getErrorMessage } from "@/lib/errors";
import { reportError } from "@/lib/monitoring";

export const useSignInViewModel = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputForms>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmitSignIn = async (data: UserInputForms) => {
    try {
      setLoading(true);
      setError("");

      const user = await signIn(data.email, data.password);

      if (user.team) {
        router.replace("/(tabs)/team");
      } else {
        router.push("/welcome");
      }
    } catch (error) {
      reportError(error, "sign-in-form");
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
    handleSubmit: handleSubmit(handleSubmitSignIn),
  };
};
