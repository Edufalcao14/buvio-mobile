import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme, size: "sm" | "md") => {
  const stickerHeight = size === "md" ? 148 : 104;
  const lineSize =
    size === "md" ? theme.typography.fontSize.xl : theme.typography.fontSize.lg;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    // Slapped slightly askew, like on a locker door.
    sticker: {
      width: stickerHeight * 0.52,
      height: stickerHeight,
      transform: [{ rotate: "-4deg" }],
    },
    line: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: lineSize,
      lineHeight: lineSize * theme.typography.lineHeight.tight,
      color: theme.colors.text.primary,
    },
  });
};
