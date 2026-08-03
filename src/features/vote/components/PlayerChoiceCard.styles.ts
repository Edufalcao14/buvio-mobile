import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme, isSelected: boolean) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      minHeight: 76,
      borderRadius: theme.borderRadius.bubble,
      backgroundColor: theme.colors.background.paper,
      // Selection is outlined in Verde Campo, never filled in gold: the gold
      // on this screen belongs to the confirm button alone (DESIGN.md).
      borderWidth: isSelected ? 2 : 1.5,
      borderColor: isSelected
        ? theme.colors.primary.light
        : theme.colors.grey.border,
      ...theme.shadows.card,
    },
    name: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    check: {
      width: 28,
      height: 28,
      borderRadius: theme.borderRadius.round,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary.light,
    },
  });
