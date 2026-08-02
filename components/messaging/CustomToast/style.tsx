import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "95%",
      alignItems: "center",
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      borderLeftWidth: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      gap: theme.spacing.md,
      backgroundColor: "#ffffffff",
    },
    text: {
      fontSize: 14,
      fontWeight: "500",
    },
  });
