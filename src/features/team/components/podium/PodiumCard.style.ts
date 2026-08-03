import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme, variant: "top" | "flop") => {
  const isTop = variant === "top";

  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.bubble,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.tiny,
      ...theme.shadows.card,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
    },
    emoji: { fontSize: theme.typography.fontSize.xl },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text.primary,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      // Gold belongs to the honours podium only (see DESIGN.md).
      backgroundColor: isTop ? theme.colors.grey[50] : "transparent",
    },
    rowMine: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary.light,
    },
    medal: { fontSize: theme.typography.fontSize.lg, width: 26 },
    name: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
    youTag: {
      fontFamily: theme.typography.fontFamily.displaySemiBold,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.primary.light,
    },
    count: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      color: isTop ? theme.colors.secondary.dark : theme.colors.text.secondary,
    },
    empty: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontStyle: "italic",
    },
  });
};
