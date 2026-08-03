import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboard: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    mainContainer: {
      padding: theme.spacing.lg,
    },
    container: {
      gap: theme.spacing.xl,
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text.primary,
    },
    subtitle: {
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
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
  });
