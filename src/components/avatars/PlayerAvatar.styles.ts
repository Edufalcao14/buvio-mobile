import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export type AvatarTone = "neutral" | "gold" | "green";

const backgroundFor = (theme: Theme, tone: AvatarTone) => {
  switch (tone) {
    case "gold":
      return theme.colors.secondary.main;
    case "green":
      return theme.colors.primary.main;
    default:
      return theme.colors.grey[200];
  }
};

const textFor = (theme: Theme, tone: AvatarTone) => {
  switch (tone) {
    case "gold":
      return theme.colors.secondary.contrastText;
    case "green":
      return theme.colors.primary.contrastText;
    default:
      return theme.colors.text.variant;
  }
};

export const createStyles = (theme: Theme, size: number, tone: AvatarTone) =>
  StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: theme.borderRadius.round,
      backgroundColor: backgroundFor(theme, tone),
      borderWidth: tone === "neutral" ? 1 : 0,
      borderColor: theme.colors.grey[300],
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    photo: {
      width: "100%",
      height: "100%",
    },
    initials: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: Math.round(size * 0.4),
      color: textFor(theme, tone),
      letterSpacing: theme.typography.letterSpacing.tight,
    },
  });
