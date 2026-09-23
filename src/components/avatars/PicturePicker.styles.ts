import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    field: {
      gap: theme.spacing.xs,
    },
    // A row on paper, like every other input.
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      minHeight: 52,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      backgroundColor: theme.colors.background.paper,
    },
    rowPressed: {
      borderColor: theme.colors.primary.light,
    },
    preview: {
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      flex: 1,
      gap: 2,
    },
    label: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    action: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary.light,
    },
    hint: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.hint,
    },
    remove: {
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.xs,
    },
    removeText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
  });
