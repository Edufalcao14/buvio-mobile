import { StyleSheet } from "react-native";
import { Theme } from "@/theme";
import { EdgeInsets } from "react-native-safe-area-context";

// One flat canvas: wordmark, one headline, one form, one gold action. The
// mascot no longer opens the app — the data does (DESIGN.md).
export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    keyboard: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: insets.top + theme.spacing.lg,
      paddingBottom: Math.max(theme.spacing.xl, insets.bottom),
    },
    wordmark: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.md,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.secondary.main,
    },
    sheetTitle: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxxl,
      lineHeight:
        theme.typography.fontSize.xxxl * theme.typography.lineHeight.tight,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
      marginTop: theme.spacing.xl,
    },
    subtitle: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    formContainer: {
      gap: theme.spacing.md,
      paddingTop: theme.spacing.xl,
    },
    inputContainer: {
      gap: theme.spacing.md,
      paddingTop: theme.spacing.sm,
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
    textLink: {
      alignSelf: "center",
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
    },
    link: {
      fontFamily: theme.typography.fontFamily.semiBold,
      color: theme.colors.text.primary,
    },
  });
