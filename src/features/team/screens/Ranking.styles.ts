import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    listContent: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
      gap: theme.spacing.md,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.background.default,
    },
    header: {
      marginBottom: theme.spacing.lg,
    },
    caption: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },

    empty: {
      paddingTop: theme.spacing.xl,
    },
    errorText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    retryButton: {
      alignSelf: "stretch",
      paddingHorizontal: theme.spacing.xl,
    },
  });
