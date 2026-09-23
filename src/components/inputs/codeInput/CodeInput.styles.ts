import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboard: {
      flex: 1,
    },
    characterBoxesContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: theme.spacing.sm,
    },
    characterBox: {
      width: 52,
      height: 64,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background.paper,
    },
    // A filled cell earns the gold — the code taking shape.
    filledCharacterBox: {
      borderColor: theme.colors.secondary.main,
    },
    characterInput: {
      width: "100%",
      height: "100%",
      textAlign: "center",
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text.primary,
    },
    errorContainer: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
      textAlign: "center",
    },
    container: {
      flexDirection: "column",
      gap: theme.spacing.lg,
      alignItems: "center",
    },
  });
