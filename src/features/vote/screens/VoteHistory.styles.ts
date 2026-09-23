import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    // Green chrome, same bar as the vote itself — the list is a room of the
    // same building, not a foreign screen.
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      backgroundColor: theme.colors.primary.main,
    },
    closeButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.round,
    },
    topBarTitle: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.primary.contrastText,
    },
    body: {
      flex: 1,
    },
    list: {
      padding: theme.spacing.md,
      paddingBottom: theme.spacing.xxl,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    stateText: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    action: {
      alignSelf: "stretch",
      paddingHorizontal: theme.spacing.xl,
    },
    caption: {
      paddingHorizontal: theme.spacing.tiny,
      paddingBottom: theme.spacing.xs,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },

    /* The player who received the votes — the heading of their block. */
    groupHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.bubble,
      backgroundColor: theme.colors.background.default,
    },
    groupName: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    countPillTop: { borderColor: theme.colors.secondary.main },
    countKind: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: 10,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    countKindTop: { color: theme.colors.secondary.main },
    countPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.tiny,
      paddingVertical: theme.spacing.tiny,
      paddingHorizontal: theme.spacing.xs,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.grey[100],
    },
    countText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    emoji: {
      fontSize: theme.typography.fontSize.sm,
    },

    /* One ballot. */
    entry: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.xs,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.bubble,
      backgroundColor: theme.colors.background.paper,
      ...theme.shadows.card,
    },
    entryBody: {
      flex: 1,
      gap: theme.spacing.tiny,
    },
    entryLine: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.tiny,
    },
    voterName: {
      flexShrink: 1,
      fontFamily: theme.typography.fontFamily.displaySemiBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
    verdictWord: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    comment: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.primary,
    },
    // A silent vote is a choice, not a gap: it says so, quietly and in italic,
    // instead of leaving the row looking half-rendered.
    noComment: {
      fontSize: theme.typography.fontSize.sm,
      fontStyle: "italic",
      color: theme.colors.text.hint,
    },
  });
