import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

/**
 * `hasVoteCta` is the gold budget of this screen: when the vote pill is up it
 * owns the gold and the create-match FAB becomes green (see DESIGN.md — one
 * gold action per screen).
 */
export const createStyles = (theme: Theme, hasVoteCta = false) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.xl,
    },
    emptyHint: {
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
        ? theme.colors.primary.main
        : theme.colors.secondary.main,
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadows.raised,
    },
    fabText: {
      color: hasVoteCta
        ? theme.colors.primary.contrastText
        : theme.colors.secondary.contrastText,
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: "700",
      lineHeight: theme.typography.fontSize.xxl * 1.1,
    },
    // The floating gold pill: the one thing the team owes right now.
    votePill: {
      position: "absolute",
      left: theme.spacing.md,
      bottom: theme.spacing.md,
      minHeight: 52,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.secondary.main,
      ...theme.shadows.raised,
    },
    votePillText: {
      // Baloo bakes its weight in — never pair it with a fontWeight.
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.secondary.contrastText,
    },
  });
