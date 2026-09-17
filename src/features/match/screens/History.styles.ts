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
    // The season at a glance: how much was played, how much was judged.
    summary: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.bubble,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      paddingVertical: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.card,
    },
    summaryItem: {
      flex: 1,
      alignItems: "center",
      gap: 2,
    },
    summaryValue: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text.primary,
    },
    summaryLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    summaryLiveValue: {
      color: theme.colors.error.main,
    },
    summaryDivider: {
      width: 1,
      alignSelf: "stretch",
      backgroundColor: theme.colors.grey[100],
    },
    // Sticky, so it must paint the ground it floats over.
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      backgroundColor: theme.colors.background.default,
      paddingBottom: theme.spacing.xs,
      paddingTop: theme.spacing.tiny,
    },
    sectionTitle: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
    // A hairline pushes the count to the edge and gives the month a baseline.
    sectionRule: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.grey.border,
    },
    sectionCount: {
      fontFamily: theme.typography.fontFamily.displaySemiBold,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
    },
    sectionSpacer: {
      height: theme.spacing.md,
    },
    itemSpacer: {
      height: theme.spacing.sm,
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
