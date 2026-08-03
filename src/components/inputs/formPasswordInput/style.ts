import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      minHeight: 52,
      borderWidth: 1.5,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.input,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background.paper,
    },
    // Focus wears the field green — the active line on the pitch.
    inputFocused: {
      borderColor: theme.colors.primary.light,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    passwordContainer: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
    },
    passwordInput: {
      flex: 1,
      paddingRight: 48,
    },
    eyeIconContainer: {
      position: "absolute",
      right: 0,
      width: 48,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
