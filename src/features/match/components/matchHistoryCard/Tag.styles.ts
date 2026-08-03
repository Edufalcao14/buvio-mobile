import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // Pill geometry — the bubble world down to its smallest chip.
    tag: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      maxWidth: "100%",
      borderRadius: theme.borderRadius.round,
      borderWidth: 1,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 3,
    },
    label: {
      fontFamily: theme.typography.fontFamily.displaySemiBold,
      fontSize: theme.typography.fontSize.xs,
      // No fontWeight: Baloo bakes its own (DESIGN.md).
    },
    neutralTag: {
      backgroundColor: theme.colors.grey[50],
      borderColor: theme.colors.grey.border,
    },
    neutralLabel: {
      color: theme.colors.text.secondary,
    },
    // A running vote is the one thing on this screen that can still change.
    liveTag: {
      backgroundColor: theme.colors.error.light,
      borderColor: theme.colors.error.main,
    },
    liveLabel: {
      color: theme.colors.error.main,
    },
    // The honours pill IS the MVP medallion: the only gold on the card.
    honoursTag: {
      backgroundColor: theme.colors.secondary.main,
      borderColor: theme.colors.secondary.dark,
    },
    honoursLabel: {
      color: theme.colors.secondary.contrastText,
    },
  });
