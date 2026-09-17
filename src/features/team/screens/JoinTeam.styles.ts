import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboard: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    mainContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    containerMain: {
      flexDirection: "column",
      gap: theme.spacing.lg,
    },
    headerContainer: {
      marginBottom: theme.spacing.xl,
      gap: theme.spacing.xs,
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text.primary,
    },
    description: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    formContainer: {
      marginBottom: theme.spacing.xl,
      width: "100%",
    },
    inputLabel: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    inputContainers: {
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing.lg,
    },
    displayCodeInfoContainer: {
      flexDirection: "column",
      width: "100%",
      gap: theme.spacing.sm,
    },
    codeHint: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    helpContainer: {
      marginTop: theme.spacing.lg,
      alignItems: "center",
      gap: theme.spacing.tiny,
    },
    helpText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    helpLink: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: "600",
      color: theme.colors.primary.light,
      textDecorationLine: "underline",
      paddingVertical: theme.spacing.xs,
    },
    displayCode: {
      padding: theme.spacing.md,
      borderWidth: 2,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
      width: "100%",
      borderRadius: theme.borderRadius.lg,
      textAlign: "center",
      fontSize: theme.typography.fontSize.xxxl,
      letterSpacing: 4,
      color: theme.colors.text.primary,
      fontWeight: "800",
    },
    // The assembled code earns the gold — the team taking shape.
    displayCodeActive: {
      borderColor: theme.colors.secondary.main,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
      textAlign: "center",
    },
  });
