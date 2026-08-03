import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scroll: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
      gap: theme.spacing.md,
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      lineHeight:
        theme.typography.fontSize.xxl * theme.typography.lineHeight.tight,
      color: theme.colors.text.primary,
    },
    countdown: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.primary.main,
    },
    countdownText: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary.contrastText,
      fontVariant: ["tabular-nums"],
    },
    sectionTitle: {
      marginTop: theme.spacing.sm,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    caption: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    voters: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.xs,
    },
    voterChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.tiny,
      paddingVertical: theme.spacing.tiny,
      paddingHorizontal: theme.spacing.sm,
      minHeight: 36,
      borderRadius: theme.borderRadius.round,
      borderWidth: 1.5,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
    },
    voterChipDone: {
      borderColor: theme.colors.primary.light,
    },
    voterName: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
    },
    voterNamePending: {
      color: theme.colors.text.secondary,
    },
    rows: {
      gap: theme.spacing.sm,
    },
    emptyText: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    errorText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.error.main,
    },
    adminAction: {
      marginTop: theme.spacing.md,
    },
  });
