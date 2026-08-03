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
      alignItems: "center",
    },
    reasonPill: {
      paddingVertical: theme.spacing.tiny,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.grey[100],
    },
    reasonText: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
    },
    verdictCard: {
      alignSelf: "stretch",
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.bubble,
      backgroundColor: theme.colors.background.paper,
      ...theme.shadows.card,
    },
    verdictLabel: {
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    winnerName: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      lineHeight:
        theme.typography.fontSize.xxl * theme.typography.lineHeight.tight,
      color: theme.colors.text.primary,
      textAlign: "center",
    },
    flopName: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text.primary,
      textAlign: "center",
    },
    consolation: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    sectionTitle: {
      alignSelf: "flex-start",
      marginTop: theme.spacing.sm,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    rows: {
      alignSelf: "stretch",
      gap: theme.spacing.sm,
    },
    emptyText: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    confetti: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  });
