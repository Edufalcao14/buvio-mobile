import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme, size: number, isTop: boolean) =>
  StyleSheet.create({
    frame: {
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    art: {
      width: size,
      height: size,
    },
    // Last resort: the honours medallion — gold disc for the Top, neutral
    // disc for the Flop (the roast never gets its own colour).
    medallion: {
      width: size * 0.72,
      height: size * 0.72,
      borderRadius: theme.borderRadius.round,
      backgroundColor: isTop
        ? theme.colors.secondary.main
        : theme.colors.grey[200],
      borderWidth: isTop ? 0 : 1,
      borderColor: theme.colors.grey[300],
      alignItems: "center",
      justifyContent: "center",
    },
  });
