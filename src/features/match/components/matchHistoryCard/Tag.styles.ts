import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // Small, square-ish chips: a scoreboard label, not a bubble.
    tag: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      gap: 5,
      maxWidth: "100%",
      borderRadius: theme.borderRadius.sm,
      borderWidth: 1,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 3,
      minHeight: 22,
    },
    withAvatar: { paddingLeft: 3, borderRadius: 12, minHeight: 24 },
    label: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
    },
    neutralTag: {
      backgroundColor: theme.colors.grey[100],
      borderColor: theme.colors.grey.border,
    },
    neutralLabel: { color: theme.colors.text.secondary },
    // A running vote is the one thing on this screen that can still change.
    liveTag: {
      backgroundColor: theme.colors.success.light,
      borderColor: theme.colors.primary.dark,
    },
    liveLabel: { color: theme.colors.primary.light },
    // The honours chip IS the MVP medallion: the only gold on the card.
    honoursTag: {
      backgroundColor: theme.colors.secondary.main,
      borderColor: theme.colors.secondary.main,
    },
    honoursLabel: { color: theme.colors.secondary.contrastText },
  });
