import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export type MascotSize = "sm" | "md" | "lg";

export const createStyles = (
  theme: Theme,
  size: MascotSize,
  aspectRatio: number
) => {
  const stickerHeight = { sm: 104, md: 148, lg: 200 }[size];
  // The line does not grow past `lg`: a bigger sticker is a bigger mascot, not
  // a louder sentence, and the screen's own title has to stay the loudest thing.
  const lineSize =
    size === "sm" ? theme.typography.fontSize.lg : theme.typography.fontSize.xl;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    // Slapped slightly askew, like on a locker door.
    sticker: {
      // Driven by the artwork's own ratio: the coach is a wider figure than the
      // player, and a shared constant squashed whichever one it was not made for.
      width: stickerHeight * aspectRatio,
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
