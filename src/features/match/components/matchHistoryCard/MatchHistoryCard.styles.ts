import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      gap: theme.spacing.md,
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.bubble,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      padding: theme.spacing.md,
      ...theme.shadows.card,
    },
    cardPressed: {
      backgroundColor: theme.colors.grey[50],
      borderColor: theme.colors.grey[200],
      transform: [{ scale: 0.99 }],
    },
    dateBlock: {
      width: 52,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.grey[50],
      alignItems: "center",
      justifyContent: "center",
    },
    day: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.primary.light,
    },
    month: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    body: {
      flex: 1,
      gap: theme.spacing.xs,
      justifyContent: "center",
    },
    name: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    // Wraps so a long winner's name never squeezes the vote state out.
    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: theme.spacing.tiny,
    },
    players: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
    },
  });
