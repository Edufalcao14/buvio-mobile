import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    name: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
    meters: {
      gap: theme.spacing.tiny,
    },
    meter: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    meterLabel: {
      width: 40,
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.hint,
    },
    // Thin bars on a hairline track: a stat, not a progress meter.
    track: {
      flex: 1,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.grey[200],
      overflow: "hidden",
    },
    fillTop: {
      height: "100%",
      borderRadius: 3,
      backgroundColor: theme.colors.secondary.main,
    },
    fillFlop: {
      height: "100%",
      borderRadius: 3,
      backgroundColor: theme.colors.grey[500],
    },
    count: {
      minWidth: 22,
      textAlign: "right",
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
  });
