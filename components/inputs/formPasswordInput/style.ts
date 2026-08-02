import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      display: "flex",
      gap: theme.spacing.sm,
      padding: theme.spacing.tiny,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.input,
      fontSize: theme.typography.fontSize.md,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    label: {
      fontSize: theme.typography.fontSize.md,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.md,
    },
    keyboard: {
      flex: 1
    },
    passwordContainer: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
    },
    passwordInput: {
      flex: 1,
    },
    eyeIconContainer: {
      position: "absolute",
      right: 12,
      height: "100%",
      justifyContent: "center",
    },
    eyeIcon: {
      width: 20,
      height: 20,
      tintColor: theme.colors.grey[300],
    },
  });