import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboard: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    mainContainer: {
      padding: theme.spacing.md,
    },
    container: {
      gap: theme.spacing.xl,
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    headerContainer: {
      gap: theme.spacing.xs,
    },
    containerInputs: {
      gap: theme.spacing.md,
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
  });
