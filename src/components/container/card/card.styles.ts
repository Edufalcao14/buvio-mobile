import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

// A row on a paper surface. `color` tints the icon disc only.
export const createStyles = (theme: Theme, color: string) =>
  StyleSheet.create({
    card: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      backgroundColor: theme.colors.background.paper,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
    },
    body: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    description: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.snug,
      color: theme.colors.text.secondary,
    },
    helpText: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.primary.light,
      marginTop: 2,
    },
  });
