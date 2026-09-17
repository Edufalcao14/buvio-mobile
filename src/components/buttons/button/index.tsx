import { Pressable, Text, ActivityIndicator } from "react-native";
import { createStyles, ButtonVariant } from "./Button.styles";
import { useTheme } from "@/providers/ThemeProvider";

type ButtonProps = {
  text: string;
  onPress: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  /**
   * "primary" — Dourado Chopp, the one main action of the screen.
   * "secondary" — Verde Gramado, supporting actions.
   */
  variant?: ButtonVariant;
};

export const Button = ({
  text,
  onPress,
  isLoading = false,
  disabled = false,
  variant = "primary",
}: ButtonProps) => {
  const theme = useTheme();
  const styles = createStyles(theme, variant);
  const spinnerColor =
    variant === "primary"
      ? theme.colors.secondary.contrastText
      : theme.colors.primary.contrastText;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && !isLoading && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={text}
      accessibilityState={{ disabled: disabled || isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};
