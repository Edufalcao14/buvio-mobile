import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      gap: theme.spacing.xs,
    },
    input: {
      minHeight: 48,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.input,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background.paper,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    label: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
    keyboard: {
      flex: 1,
    },
  });
