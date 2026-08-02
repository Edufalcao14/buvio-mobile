import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboard: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    characterBoxesContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "auto",
      gap: theme.spacing.sm,
    },
    characterBox: {
      width: 40,
      height: 60,
      borderWidth: 1.5,
      borderColor: theme.colors.secondary.main,
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background.default,
    },
    filledCharacterBox: {
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.default,
    },
    characterInput: {
      width: "100%",
      height: "100%",
      textAlign: "center",
      fontSize: theme.typography.fontSize.xxxl,
      fontWeight: "bold",
      color: theme.colors.secondary.main,
    },
    errorContainer: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
      textAlign: 'center'
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing.xl,
      alignItems: 'center'
    },
  });
