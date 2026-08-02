// components/inputs/BaseFormInput.tsx
import { Control, Controller, FieldErrors } from "react-hook-form";
import { View, Text } from "react-native";
import { useTheme } from "../../../providers/ThemeProvider";
import { createStyles } from "./style";
import React from "react";

export type BaseFormInputProps = {
  control: Control<any>;
  errors: FieldErrors<any>;
  label: string;
  name: string;
};

export const BaseFormInput = ({
  control,
  errors,
  name,
  label,
  renderField,
}: BaseFormInputProps & {
  renderField: (props: { field: any }) => React.ReactElement;
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={renderField}
        name={name}
      />
      {errors[name] && typeof errors[name].message === "string" && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );
};