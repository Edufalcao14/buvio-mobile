import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    scroll: {
      flex: 1,
    },
    content: {
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xxl,
    },
    card: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.bubble,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.tiny,
      ...theme.shadows.card,
    },
    cardLabel: {
      fontFamily: theme.typography.fontFamily.displaySemiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.xs,
    },
    primaryValue: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    secondaryValue: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      textTransform: "capitalize",
    },
    // The form inside a card: the picker, the two names, then the one gold
    // action that commits them.
    form: {
      gap: theme.spacing.xs,
    },
    fieldHint: {
      fontSize: theme.typography.fontSize.xs,
      lineHeight:
        theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      marginTop: -theme.spacing.tiny,
    },
    emailRow: {
      marginTop: theme.spacing.xs,
      gap: 2,
    },
    emailLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    saveAction: {
      marginTop: theme.spacing.md,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
      marginTop: theme.spacing.xs,
    },
    crestPicker: {
      marginTop: theme.spacing.md,
    },
    teamRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    teamText: {
      flex: 1,
      gap: 2,
    },
    codeBlock: {
      marginTop: theme.spacing.md,
      paddingTop: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.grey[100],
      gap: theme.spacing.tiny,
    },
    codeLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    codeValue: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxxl,
      letterSpacing: 6,
      color: theme.colors.primary.light,
    },
    codeHint: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    codeActions: {
      flexDirection: "row",
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    codeAction: {
      flex: 1,
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.xs,
      borderRadius: theme.borderRadius.round,
      borderWidth: 1.5,
      borderColor: theme.colors.primary.light,
      backgroundColor: theme.colors.grey[50],
    },
    codeActionPressed: {
      backgroundColor: theme.colors.grey[100],
    },
    codeActionText: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary.light,
    },
    logout: {
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.xs,
      borderRadius: theme.borderRadius.round,
      borderWidth: 1.5,
      borderColor: theme.colors.error.main,
      backgroundColor: theme.colors.background.paper,
      marginTop: theme.spacing.md,
    },
    logoutPressed: {
      backgroundColor: theme.colors.error.light,
    },
    deleteAccount: {
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      marginTop: theme.spacing.xs,
    },
    deleteAccountPressed: {
      opacity: 0.6,
    },
    deleteAccountText: {
      color: theme.colors.text.hint,
      fontSize: theme.typography.fontSize.sm,
      textDecorationLine: "underline",
    },
    logoutText: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.error.main,
    },
  });
