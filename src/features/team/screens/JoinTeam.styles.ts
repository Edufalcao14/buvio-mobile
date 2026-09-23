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
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
    containerMain: {
      gap: theme.spacing.lg,
    },
    headerContainer: {
      marginBottom: theme.spacing.lg,
      gap: theme.spacing.xs,
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
    },
    description: {
      fontFamily: theme.typography.fontFamily.regular,
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
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    inputContainers: {
      alignItems: "center",
      gap: theme.spacing.lg,
    },
    displayCodeInfoContainer: {
      width: "100%",
      gap: theme.spacing.sm,
    },
    codeHint: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.hint,
      textAlign: "center",
    },
    helpContainer: {
      marginTop: theme.spacing.lg,
      alignItems: "center",
      gap: theme.spacing.tiny,
    },
    helpText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    helpLink: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
      paddingVertical: theme.spacing.xs,
    },
    // The assembled code: a scoreboard readout, gold once complete.
    displayCode: {
      paddingVertical: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      backgroundColor: theme.colors.background.paper,
      width: "100%",
      borderRadius: theme.borderRadius.lg,
      textAlign: "center",
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.display,
      lineHeight: theme.typography.fontSize.display * 1.1,
      letterSpacing: 8,
      color: theme.colors.text.primary,
      minHeight: 76,
    },
    displayCodeActive: {
      borderColor: theme.colors.secondary.main,
      color: theme.colors.secondary.main,
    },
    displayCodeEmpty: {
      color: theme.colors.grey[400],
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
      textAlign: "center",
    },
  });
