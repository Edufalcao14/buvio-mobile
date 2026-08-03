import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.bubble,
      backgroundColor: theme.colors.background.paper,
      ...theme.shadows.card,
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
      width: 42,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
    },
    track: {
      flex: 1,
      height: 10,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.grey[100],
      overflow: "hidden",
    },
    fillTop: {
      height: "100%",
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.primary.light,
    },
    fillFlop: {
      height: "100%",
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.grey[400],
    },
    count: {
      minWidth: 22,
      textAlign: "right",
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
  });
