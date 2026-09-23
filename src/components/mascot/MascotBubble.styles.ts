import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export type MascotSize = "sm" | "md" | "lg";

// Demoted to an accent: smaller than before, straight (no sticker tilt), and
// the line is display type in the app's own voice — the goat is a footnote to
// the data, not the headline (DESIGN.md).
export const createStyles = (
  theme: Theme,
  size: MascotSize,
  aspectRatio: number
) => {
  const stickerHeight = { sm: 72, md: 96, lg: 128 }[size];
  const lineSize =
    size === "sm" ? theme.typography.fontSize.md : theme.typography.fontSize.lg;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    sticker: {
      width: stickerHeight * aspectRatio,
      height: stickerHeight,
    },
    line: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: lineSize,
      lineHeight: lineSize * theme.typography.lineHeight.snug,
      color: theme.colors.text.variant,
    },
  });
};
