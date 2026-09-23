import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    listContent: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xxl,
    },
    footerSpinner: {
      paddingVertical: theme.spacing.lg,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.background.default,
    },
    banner: { marginBottom: theme.spacing.md },
    // Scoreboard tiles: big condensed number, small caps label.
    summary: {
      flexDirection: "row",
      alignItems: "stretch",
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      paddingVertical: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    summaryItem: {
      flex: 1,
      alignItems: "center",
      gap: 2,
    },
    summaryValue: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xxxl,
      lineHeight: theme.typography.fontSize.xxxl,
      color: theme.colors.text.primary,
    },
    summaryLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    summaryLiveValue: {
      color: theme.colors.primary.light,
    },
    // The hot-streak strip under the scoreboard.
    streak: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      marginTop: -theme.spacing.sm,
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.grey[100],
    },
    streakText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    streakName: {
      fontFamily: theme.typography.fontFamily.displayBold,
      color: theme.colors.text.primary,
    },
    summaryDivider: {
      width: StyleSheet.hairlineWidth,
      alignSelf: "stretch",
      backgroundColor: theme.colors.grey[300],
    },
    // Sticky, so it must paint the ground it floats over.
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.background.default,
      paddingBottom: theme.spacing.xs,
      paddingTop: theme.spacing.xs,
    },
    sectionTitle: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    sectionRule: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.grey.border,
    },
    sectionCount: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.hint,
    },
    sectionSpacer: {
      height: theme.spacing.md,
    },
    itemSpacer: {
      height: theme.spacing.xs,
    },
    empty: {
      paddingTop: theme.spacing.xl,
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    retryButton: {
      alignSelf: "stretch",
      paddingHorizontal: theme.spacing.xl,
    },
  });
