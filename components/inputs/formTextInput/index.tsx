import { Control, Controller, FieldErrors } from "react-hook-form";
import { View, Text, TextInput } from "react-native";
import { createStyles } from "./style";
import { useTheme } from "../../../providers/ThemeProvider";
import { useCallback } from "react";
import { BaseFormInput } from "../BaseFormInput";

type FormTextInputProps = {
  control: Control<any>;
  errors: FieldErrors;
  label: string;
  placeHolder: string;
  name: string;
};

export const FormTextInput = ({
  control,
  errors,
  name,
  label,
  placeHolder,
}: FormTextInputProps) => {
  const treme = useTheme();
  const styles = createStyles(treme);

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
      <TextInput
        style={[styles.input, errors[name] && styles.inputError]}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder={placeHolder}
      />
    ),
    [errors, name, placeHolder]
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
