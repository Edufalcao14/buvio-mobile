import { Control, Controller, FieldErrors } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { createStyles } from "./style";
import { useTheme } from "../../../providers/ThemeProvider";
import { useState, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import { UserInputForms as SignInForm } from "../../../screens/SignIn/SignInValidation";
import { UserInputForms as SignUpForm } from "../../../screens/SignUp/SignUpValidation";
import { BaseFormInput } from "../BaseFormInput";

type FormPasswordInputProps = {
  control: Control<SignInForm | SignUpForm>;
  errors: FieldErrors<SignInForm | SignUpForm>;
  label: string;
  placeHolder: string;
  name: "password" | "confirmPassword";
};

export const FormPasswordInput = ({
  control,
  errors,
  name,
  label,
  placeHolder,
}: FormPasswordInputProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const hasError = (fieldName: "password" | "confirmPassword") => {
    return fieldName in errors;
  };

  const getErrorMessage = (fieldName: "password" | "confirmPassword") => {
    const error = errors[fieldName as keyof typeof errors];
    return error?.message as string | undefined;
  };

  const renderInput = useCallback(
    ({
      field: { onChange, onBlur, value },
    }: {
      field: {
        onChange: (value: string) => void;
        onBlur: () => void;
        value: string;
      };
    }) => (
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            styles.passwordInput,
            hasError(name) && styles.inputError,
          ]}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder={placeHolder}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={togglePasswordVisibility}
          accessibilityRole="button"
          accessibilityLabel={
            showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
          accessibilityHint="Touchez pour changer la visibilité du mot de passe"
        >
          <Entypo
            name={showPassword ? "eye-with-line" : "eye"}
            size={20}
            color={
              showPassword ? theme.colors.grey[600] : theme.colors.primary.main
            }
          />
        </TouchableOpacity>
      </View>
    ),
    [errors, name, placeHolder, showPassword]
  );

  return (
    <BaseFormInput
      control={control}
      errors={errors}
      name={name}
      label={label}
      renderField={renderInput}
    />
  );
};
