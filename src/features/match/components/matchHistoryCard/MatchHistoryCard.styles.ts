import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // A fixture row: date column, then the match, hairline-bordered paper.
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    cardPressed: {
      backgroundColor: theme.colors.grey[100],
      borderColor: theme.colors.grey[300],
    },
    dateBlock: {
      width: 48,
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
    },
    day: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xxl,
      lineHeight: theme.typography.fontSize.xxl,
      color: theme.colors.text.primary,
    },
    month: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
      textTransform: "uppercase",
      letterSpacing: theme.typography.letterSpacing.caps,
    },
    body: {
      flex: 1,
      gap: theme.spacing.tiny,
      justifyContent: "center",
    },
    name: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: theme.spacing.tiny,
    },
    spotlight: {
      flexDirection: "row",
      gap: theme.spacing.xs,
      marginTop: theme.spacing.tiny,
    },
    spot: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      minHeight: 60,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.grey[100],
    },
    spotTop: {
      backgroundColor: theme.colors.secondary.main,
      borderColor: theme.colors.secondary.main,
    },
    // The face, with the verdict pinned to its corner like an MVP badge.
    face: { width: 44, height: 44 },
    badge: {
      position: "absolute",
      right: -4,
      bottom: -2,
      width: 22,
      height: 22,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.grey[300],
      borderWidth: 2,
      borderColor: theme.colors.grey[100],
    },
    badgeTop: {
      backgroundColor: theme.colors.secondary.contrastText,
      borderColor: theme.colors.secondary.main,
    },
    spotText: { flex: 1, gap: 1 },
    spotKind: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: 10,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    spotKindTop: { color: theme.colors.secondary.contrastText, opacity: 0.7 },
    spotName: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.lg,
      lineHeight: theme.typography.fontSize.lg + 2,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
    },
    spotNameTop: { color: theme.colors.secondary.contrastText },
    players: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.hint,
    },
  });
