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
      width: 48,
      height: 60,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background.paper,
    },
    // A filled box earns the gold — the code taking shape.
    filledCharacterBox: {
      borderWidth: 2,
      borderColor: theme.colors.secondary.main,
    },
    characterInput: {
      width: "100%",
      height: "100%",
      textAlign: "center",
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    errorContainer: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
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
