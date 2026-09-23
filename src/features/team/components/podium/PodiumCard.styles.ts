import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

// A standings table: rank column, avatar, name, count. The top podium's #1
// wears gold on the count; the flop stays neutral (the roast is affectionate).
export const createStyles = (theme: Theme, variant: "top" | "flop") => {
  const isTop = variant === "top";

  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.grey.border,
    },
    emoji: { fontSize: theme.typography.fontSize.md },
    title: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.grey.border,
    },
    rowMine: {
      backgroundColor: theme.colors.grey[100],
    },
    // Rank as a number, not a medal emoji — a standings column.
    medal: {
      width: 22,
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.hint,
      textAlign: "center",
    },
    name: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
    youTag: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.hint,
    },
    tier: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.hint,
    },
    count: {
      minWidth: 28,
      textAlign: "right",
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xl,
      color: isTop ? theme.colors.secondary.main : theme.colors.text.variant,
    },
    empty: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.hint,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
  });
};
