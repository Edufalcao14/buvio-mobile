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
      gap: theme.spacing.md,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.background.default,
    },
    header: {
      marginBottom: theme.spacing.sm,
    },
    caption: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    empty: {
      paddingTop: theme.spacing.xl,
    },
    // "Ma saison": the player's own scoreboard tile.
    mine: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    mineHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    mineLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    mineRow: {
      flexDirection: "row",
      alignItems: "stretch",
    },
    mineStat: {
      flex: 1,
      alignItems: "center",
      gap: 2,
    },
    mineValue: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xxxl,
      lineHeight: theme.typography.fontSize.xxxl,
      color: theme.colors.text.primary,
      textAlign: "center",
    },
    mineValueGold: {
      color: theme.colors.secondary.main,
    },
    mineStatLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    mineDivider: {
      width: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.grey[300],
    },
    mineHint: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.hint,
    },
    // Trophy tier chips: bronze/argent stay neutral surfaces, Or is the gold.
    tierChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 3,
      borderRadius: theme.borderRadius.sm,
      borderWidth: 1,
    },
    tier_bronze: {
      backgroundColor: theme.colors.grey[100],
      borderColor: theme.colors.grey.border,
    },
    tier_argent: {
      backgroundColor: theme.colors.grey[200],
      borderColor: theme.colors.grey[400],
    },
    tier_or: {
      backgroundColor: theme.colors.secondary.main,
      borderColor: theme.colors.secondary.main,
    },
    tierText: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.primary,
    },
    tierTextOr: {
      color: theme.colors.secondary.contrastText,
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
