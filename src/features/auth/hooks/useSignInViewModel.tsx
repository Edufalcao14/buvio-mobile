import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { UserInputForms, userInputSchema } from "@/features/auth/schemas/SignInValidation";
import { useAuth } from "@/providers/AuthProvider";

export const useSignInForm = () => {
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
      setError(
        error instanceof Error ? error.message : "An unknown error occurred."
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
    handleSubmit: handleSubmit(handleSubmitSignIn),
  };
};
