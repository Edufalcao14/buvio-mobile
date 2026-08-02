import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

export const createStyles = (theme: Theme , color: string) =>
  StyleSheet.create({
    card: {
      width: '100%',
      backgroundColor: theme.colors.background.paper,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.md,
      alignItems: "center",
      elevation: 2,
      shadowColor: theme.colors.background.dark,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      gap: theme.spacing.lg,
      borderColor: color
    },
    iconContainer: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.round,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color
    },
    title: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: "bold",
      color: theme.colors.text.variant,
      textAlign: "center",
    },
    description: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.variant,
      textAlign: "center",
    },
    helpText: {
      fontSize: theme.spacing.md,
      color: theme.colors.secondary.main,
      textAlign: "center",
      textDecorationLine: "underline",
    },
  });
