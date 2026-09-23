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
    hero: {
      alignItems: "center",
      paddingVertical: theme.spacing.lg,
      gap: theme.spacing.xs,
      overflow: "hidden",
    },
    liveRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    liveLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.primary.light,
    },
    // The clock: the biggest number in the app.
    clock: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: 72,
      lineHeight: 76,
      letterSpacing: -1,
      color: theme.colors.text.primary,
      fontVariant: ["tabular-nums"],
    },
    ballotsCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
    },
    ballotsText: { flex: 1, gap: theme.spacing.xs },
    ringValue: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text.primary,
    },
    ballotCount: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    sectionTitle: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    caption: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    rows: { gap: theme.spacing.xs },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.error.main,
    },
    adminAction: { marginTop: theme.spacing.md },
  });
