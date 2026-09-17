import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

// `color` is the card's accent — expressed through the icon chip,
// never as a thick colored border (see DESIGN.md).
export const createStyles = (theme: Theme, color: string) =>
  StyleSheet.create({
    card: {
      width: "100%",
      backgroundColor: theme.colors.background.paper,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.bubble,
      padding: theme.spacing.lg,
      alignItems: "center",
      gap: theme.spacing.md,
      ...theme.shadows.card,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: theme.borderRadius.round,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
    },
    title: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
      textAlign: "center",
    },
    description: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    helpText: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: "600",
      color: theme.colors.primary.light,
      textAlign: "center",
      textDecorationLine: "underline",
    },
  });
