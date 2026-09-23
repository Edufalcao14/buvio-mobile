import { StyleSheet } from "react-native";
import { Theme } from "@/theme";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    // Flat chrome on the ground itself; a hairline is all that separates it
    // from the content — the scoreboard has no header bar.
    wrapper: {
      backgroundColor: theme.colors.background.default,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.grey.border,
    },
    bar: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingTop: insets.top + theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      minHeight: 44,
    },
    // The club hero on the team tabs.
    hero: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      paddingTop: insets.top + theme.spacing.sm,
      paddingBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    identity: { flex: 1, gap: 2 },
    title: {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      letterSpacing: theme.typography.letterSpacing.tight,
    },
    heroTitle: {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      lineHeight: theme.typography.fontSize.xxl * 1.1,
      letterSpacing: theme.typography.letterSpacing.tight,
    },
    heroMeta: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    heroSport: {
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      textTransform: "capitalize",
    },
    codePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.tiny,
      paddingVertical: 2,
      paddingHorizontal: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
      backgroundColor: theme.colors.grey[100],
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.grey.border,
    },
    codePillPressed: { backgroundColor: theme.colors.grey[200] },
    codeText: {
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
    },
    iconButton: {
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export const createCrestStyles = (theme: Theme, size: number) =>
  StyleSheet.create({
    crest: {
      width: size,
      height: size,
      borderRadius: theme.borderRadius.round,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      backgroundColor: theme.colors.background.paper,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    badge: { width: "100%", height: "100%" },
    initials: {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: size * 0.4,
      letterSpacing: theme.typography.letterSpacing.tight,
    },
  });
