import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1 },
    scroll: {
      padding: theme.spacing.md,
      paddingBottom: theme.spacing.xxl,
      gap: theme.spacing.md,
      alignItems: "center",
    },
    stretch: { alignSelf: "stretch" },
    reasonPill: {
      paddingVertical: 3,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.grey[100],
    },
    reasonText: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    // The Top under the light: no card, the glow is the surface.
    winner: {
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.lg,
      overflow: "hidden",
    },
    winnerRing: {
      borderRadius: 999,
      borderWidth: 3,
      borderColor: theme.colors.secondary.main,
      padding: 4,
    },
    verdictLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.secondary.main,
    },
    verdictLabelSmall: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    winnerName: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.display,
      lineHeight:
        theme.typography.fontSize.display * theme.typography.lineHeight.tight,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
      textAlign: "center",
    },
    flopCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
    },
    flopText: { flex: 1, gap: 2 },
    flopName: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
    },
    consolation: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    sectionTitle: {
      alignSelf: "flex-start",
      marginTop: theme.spacing.sm,
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    rows: { alignSelf: "stretch", gap: theme.spacing.xs },
    historyAction: { alignSelf: "stretch", marginTop: theme.spacing.sm },
    emptyText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    confetti: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
  });
