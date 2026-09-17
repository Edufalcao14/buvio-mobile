import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import { useState } from "react";
import { createStyles } from "./FormTextInput.styles";
import { useTheme } from "@/providers/ThemeProvider";
import { BaseFormInput } from "../BaseFormInput";

type FormTextInputProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  placeHolder: string;
  name: Path<T>;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
};

export const FormTextInput = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  placeHolder,
  keyboardType,
  autoCapitalize,
  autoComplete,
}: FormTextInputProps<T>) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [focused, setFocused] = useState(false);

  const renderInput = ({
    field: { onChange, onBlur, value },
  }: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => (
    <TextInput
      testID={`input-${name}`}
      style={[
        styles.input,
        focused ? styles.inputFocused : null,
        errors[name] ? styles.inputError : null,
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
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
    />
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
