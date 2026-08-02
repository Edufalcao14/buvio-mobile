import { StyleSheet } from "react-native";
import { Theme } from "../../theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 15,
      display: "flex",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.primary.main,
    },
    containerText: {
      display: "flex",
      gap: 15,
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    formContainer: {
      display: "flex",
      gap: 12,
      padding: 20,
    },
    inputContainer: {
      display: "flex",
      gap: 8,
      padding: 5,
    },
    errorText: {
      color: "red",
      fontSize: 16,
    },
    label: {
      fontSize: 16,
    },
    textLink: { alignSelf: "center" },
    link: {
      textDecorationLine: "underline",
      color: theme.colors.secondary.main,
    },
    keyboard: {
      flex: 1,
    },
  });
