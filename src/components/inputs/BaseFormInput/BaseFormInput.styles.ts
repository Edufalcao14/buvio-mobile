import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      gap: theme.spacing.xs,
    },
    input: {
      minHeight: 52,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.input,
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background.paper,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    // Small caps label above the field — a data-sheet, not a form.
    label: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
    keyboard: {
      flex: 1,
    },
  });
