import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { UserInputForms, userInputSchema } from "./SignUpValidation";
import { useAuth } from "../../providers/AuthProvider";

export const useSignUpForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputForms>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmitSignUp = async (data: UserInputForms) => {
    try {
      setLoading(true);
      setError("");

      await signUp(data.email, data.password, data.displayName);

      router.push("/welcome");
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
    handleSubmit: handleSubmit(handleSubmitSignUp),
  };
};
