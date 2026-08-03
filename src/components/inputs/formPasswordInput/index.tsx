import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { View, TextInput, Pressable } from "react-native";
import { createStyles } from "./style";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { BaseFormInput } from "../BaseFormInput";

type FormPasswordInputProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  placeHolder: string;
  name: Path<T>;
};

export const FormPasswordInput = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  placeHolder,
}: FormPasswordInputProps<T>) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const hasError = name in errors;

  const renderInput = ({
    field: { onChange, onBlur, value },
  }: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => (
    <View style={styles.passwordContainer}>
      <TextInput
        testID={`input-${name}`}
        style={[
          styles.input,
          styles.passwordInput,
          focused ? styles.inputFocused : null,
          hasError ? styles.inputError : null,
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur();
        }}
        onChangeText={onChange}
        value={value}
        placeholder={placeHolder}
        placeholderTextColor={theme.colors.text.secondary}
        selectionColor={theme.colors.primary.light}
        secureTextEntry={!showPassword}
      />
      <Pressable
        style={styles.eyeIconContainer}
        onPress={togglePasswordVisibility}
        accessibilityRole="button"
        accessibilityLabel={
          showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
        }
        accessibilityHint="Touchez pour changer la visibilité du mot de passe"
      >
        <Entypo
          name={showPassword ? "eye-with-line" : "eye"}
          size={20}
          color={
            showPassword
              ? theme.colors.text.secondary
              : theme.colors.primary.light
          }
        />
      </Pressable>
    </View>
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
