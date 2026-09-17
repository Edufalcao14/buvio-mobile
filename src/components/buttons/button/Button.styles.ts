import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export type ButtonVariant = "primary" | "secondary";

export const createStyles = (theme: Theme, variant: ButtonVariant) => {
  const palette =
    variant === "primary" ? theme.colors.secondary : theme.colors.primary;

  return StyleSheet.create({
    button: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 54,
      backgroundColor: palette.main,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.round,
      ...theme.shadows.card,
    },
    pressed: {
      backgroundColor: palette.dark,
      transform: [{ scale: 0.98 }],
    },
    disabled: {
      backgroundColor: theme.colors.grey.disable,
      shadowOpacity: 0,
      elevation: 0,
    },
    buttonText: {
      color: palette.contrastText,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      letterSpacing: theme.typography.letterSpacing.normal,
    },
    disabledText: {
      color: theme.colors.grey[700],
    },
  });
};
