import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { createStyles } from "./style";
import { useTheme } from "../../../providers/ThemeProvider";

type ButtonProps = {
  text: string;
  onPress: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
};

export const Button = ({
  text,
  onPress,
  isLoading = false,
  disabled = false,
  backgroundColor,
}: ButtonProps) => {
  const theme = useTheme();

  const styles = createStyles(
    theme,
    backgroundColor ? backgroundColor : theme.colors.primary.main
  );

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={text}
      accessibilityState={{ disabled: disabled || isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text.lightText} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
