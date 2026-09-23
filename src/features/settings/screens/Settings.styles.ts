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
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xxl,
    },
    card: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      padding: theme.spacing.md,
      gap: theme.spacing.tiny,
    },
    cardLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
    },
    primaryValue: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    secondaryValue: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      textTransform: "capitalize",
    },
    // An address is case-sensitive to the eye: never capitalised.
    emailValue: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    form: {
      gap: theme.spacing.sm,
    },
    fieldHint: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.xs,
      lineHeight:
        theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
      color: theme.colors.text.hint,
      marginTop: -theme.spacing.tiny,
    },
    emailRow: {
      marginTop: theme.spacing.xs,
      gap: 2,
    },
    emailLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    saveAction: {
      marginTop: theme.spacing.md,
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
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
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.grey.border,
      gap: theme.spacing.tiny,
    },
    codeLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    // The code is the team's number: big, condensed, gold.
    codeValue: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.display,
      lineHeight: theme.typography.fontSize.display,
      letterSpacing: 6,
      color: theme.colors.secondary.main,
    },
    codeHint: {
      fontFamily: theme.typography.fontFamily.regular,
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
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      backgroundColor: theme.colors.background.elevated,
    },
    codeActionPressed: {
      backgroundColor: theme.colors.grey[200],
    },
    codeActionText: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.sm,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.primary,
    },
    logout: {
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
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
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.text.hint,
      fontSize: theme.typography.fontSize.sm,
    },
    logoutText: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.error.main,
    },
  });
