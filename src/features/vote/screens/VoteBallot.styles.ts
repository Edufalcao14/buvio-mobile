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
    stepMarker: {
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      color: theme.colors.text.secondary,
      textTransform: "uppercase",
    },
    title: {
      // Baloo bakes its weight in — never pair it with a fontWeight.
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      lineHeight:
        theme.typography.fontSize.xxl * theme.typography.lineHeight.tight,
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    cards: {
      gap: theme.spacing.sm,
      marginTop: theme.spacing.xs,
    },
    commentBlock: {
      gap: theme.spacing.tiny,
      marginTop: theme.spacing.xs,
    },
    commentLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    commentInput: {
      minHeight: 88,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1.5,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
      padding: theme.spacing.input,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      textAlignVertical: "top",
    },
    counter: {
      alignSelf: "flex-end",
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.hint,
    },
    emptyText: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    summary: {
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.bubble,
      backgroundColor: theme.colors.background.paper,
      ...theme.shadows.card,
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    summaryLabel: {
      width: 52,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    summaryName: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    summaryComment: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      fontStyle: "italic",
    },
    errorText: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.error.main,
    },
    footer: {
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.md,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.default,
    },
    secondaryAction: {
      alignSelf: "center",
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.md,
    },
    secondaryActionText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary.light,
    },
  });
