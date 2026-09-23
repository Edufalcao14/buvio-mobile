import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1 },
    scroll: {
      padding: theme.spacing.md,
      paddingBottom: theme.spacing.xxl,
      gap: theme.spacing.md,
    },
    stepBar: { flexDirection: "row", gap: 6 },
    stepSegment: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.grey[200],
    },
    stepSegmentOn: { backgroundColor: theme.colors.secondary.main },
    section: { gap: theme.spacing.sm },
    stepMarker: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      color: theme.colors.secondary.main,
      textTransform: "uppercase",
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxxl,
      lineHeight:
        theme.typography.fontSize.xxxl * theme.typography.lineHeight.tight,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: theme.spacing.xs,
      marginTop: theme.spacing.xs,
    },
    commentBlock: { gap: theme.spacing.tiny, marginTop: theme.spacing.sm },
    commentLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    commentInput: {
      minHeight: 76,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      backgroundColor: theme.colors.background.paper,
      padding: theme.spacing.input,
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      textAlignVertical: "top",
    },
    counter: {
      alignSelf: "flex-end",
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.hint,
    },
    emptyText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    summary: {
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    summaryRowTop: {},
    summaryLabel: {
      width: 56,
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    summaryName: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text.primary,
    },
    summaryComment: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      fontStyle: "italic",
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.error.main,
    },
    footer: {
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
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
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
  });
