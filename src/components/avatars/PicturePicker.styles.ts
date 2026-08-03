import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    field: {
      gap: theme.spacing.xs,
    },
    // A row, not a card: the picker is a secondary move next to the one gold
    // action the screen already carries (see DESIGN.md).
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      minHeight: 52,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.input,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1.5,
      borderColor: theme.colors.grey.border,
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
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
    },
    action: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary.light,
      textDecorationLine: "underline",
    },
    hint: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
    },
    remove: {
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.xs,
    },
    removeText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      textDecorationLine: "underline",
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
  });
