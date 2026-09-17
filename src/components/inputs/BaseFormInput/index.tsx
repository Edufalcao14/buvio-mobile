import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./BaseFormInput.styles";
import React from "react";

export type BaseFormInputProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  name: Path<T>;
};

export const BaseFormInput = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  renderField,
}: BaseFormInputProps<T> & {
  renderField: (props: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => React.ReactElement;
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const errorMessage = errors[name]?.message;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Controller control={control} render={renderField} name={name} />
      {typeof errorMessage === "string" ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};
