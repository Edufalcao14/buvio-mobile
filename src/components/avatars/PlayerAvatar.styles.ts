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
      return theme.colors.grey[100];
  }
};

const textFor = (theme: Theme, tone: AvatarTone) => {
  switch (tone) {
    case "gold":
      return theme.colors.secondary.contrastText;
    case "green":
      return theme.colors.primary.contrastText;
    default:
      return theme.colors.text.secondary;
  }
};

export const createStyles = (theme: Theme, size: number, tone: AvatarTone) =>
  StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: theme.borderRadius.round,
      backgroundColor: backgroundFor(theme, tone),
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    photo: {
      width: "100%",
      height: "100%",
    },
    initials: {
      // Baloo bakes its weight in — never pair it with a fontWeight.
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: Math.round(size * 0.38),
      color: textFor(theme, tone),
      letterSpacing: theme.typography.letterSpacing.wide,
    },
  });
