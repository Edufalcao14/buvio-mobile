import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

/**
 * "primary" — Dourado, the one action of the screen.
 * "secondary" — paper surface with a hairline, supporting actions.
 * "ghost" — no surface at all, for tertiary moves inside a footer.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";

export const createStyles = (theme: Theme, variant: ButtonVariant) => {
  const surface = {
    primary: {
      backgroundColor: theme.colors.secondary.main,
      borderColor: theme.colors.secondary.main,
      pressed: theme.colors.secondary.dark,
      text: theme.colors.secondary.contrastText,
    },
    secondary: {
      backgroundColor: theme.colors.background.paper,
      borderColor: theme.colors.grey[300],
      pressed: theme.colors.grey[200],
      text: theme.colors.text.primary,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      pressed: theme.colors.grey[100],
      text: theme.colors.text.secondary,
    },
  }[variant];

  return StyleSheet.create({
    button: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 52,
      backgroundColor: surface.backgroundColor,
      borderWidth: 1,
      borderColor: surface.borderColor,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
    },
    // The scale lives on the Animated.View as a CSS transition; this only
    // darkens the surface.
    pressed: {
      backgroundColor: surface.pressed,
      borderColor: surface.pressed,
    },
    disabled: {
      backgroundColor: theme.colors.grey[200],
      borderColor: theme.colors.grey[200],
    },
    buttonText: {
      color: surface.text,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
    },
    disabledText: {
      color: theme.colors.text.disabled,
    },
  });
};
