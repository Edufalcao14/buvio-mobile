import { useState } from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import Animated, { cubicBezier } from "react-native-reanimated";
import { createStyles, ButtonVariant } from "./Button.styles";
import { useTheme } from "@/providers/ThemeProvider";
import { tapImpact } from "@/components/motion/haptics";

type ButtonProps = {
  text: string;
  onPress: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  /** See `ButtonVariant` — one gold action per screen. */
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
  const [pressed, setPressed] = useState(false);
  const inert = disabled || isLoading;
  const spinnerColor =
    variant === "primary"
      ? theme.colors.secondary.contrastText
      : theme.colors.text.primary;

  return (
    <Pressable
      onPress={onPress}
      // Feedback on press-in, commit on press-out: the haptic marks the
      // finger landing on the one action of the screen.
      onPressIn={() => {
        setPressed(true);
        if (variant === "primary" && !inert) {
          tapImpact();
        }
      }}
      onPressOut={() => setPressed(false)}
      pressRetentionOffset={16}
      disabled={inert}
      accessibilityRole="button"
      accessibilityLabel={text}
      accessibilityState={{ disabled: inert }}
    >
      <Animated.View
        style={[
          styles.button,
          pressed && !inert && styles.pressed,
          disabled && styles.disabled,
          {
            transform: [{ scale: pressed && !inert ? 0.975 : 1 }],
            transitionProperty: ["transform", "backgroundColor"],
            transitionDuration: 120,
            transitionTimingFunction: cubicBezier(0.23, 1, 0.32, 1),
          },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color={spinnerColor} />
        ) : (
          <Text style={[styles.buttonText, disabled && styles.disabledText]}>
            {text}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
};
