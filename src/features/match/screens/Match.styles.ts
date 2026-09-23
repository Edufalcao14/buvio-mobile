import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

/**
 * `hasVoteCta` is the gold budget of this screen: when the live banner is up
 * it owns the gold and the create-match FAB steps down to a paper surface.
 */
export const createStyles = (theme: Theme, hasVoteCta = false) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.background.default },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.xl,
    },
    list: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: 96,
      gap: theme.spacing.sm,
    },
    sectionTitle: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.sm,
    },
    emptyHint: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    fab: {
      position: "absolute",
      right: theme.spacing.md,
      bottom: theme.spacing.md,
      width: 56,
      height: 56,
      borderRadius: theme.borderRadius.round,
      backgroundColor: hasVoteCta
        ? theme.colors.background.elevated
        : theme.colors.secondary.main,
      borderWidth: hasVoteCta ? 1 : 0,
      borderColor: theme.colors.grey[300],
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadows.raised,
    },
  });
