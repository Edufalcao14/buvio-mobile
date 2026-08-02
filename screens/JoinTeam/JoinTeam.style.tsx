import { StyleSheet } from "react-native";
import { Theme } from "../../theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboard: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    mainContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 24,
      gap: theme.spacing.md
    },
    containerMain: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing.md,
    },
    headerContainer: {
      marginBottom: 32,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.secondary.main,
      marginBottom: 12,
    },
    description: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.grey[900],
    },
    formContainer: {
      marginBottom: 32,
      width: "100%",
    },
    inputLabel: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.grey[900],
    },
    inputContainers: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      gap: theme.spacing.lg,
    },
    displayCodeInfoContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: theme.spacing.sm,
    },
    codeHint: {
      fontSize: theme.spacing.md,
      color: theme.colors.grey[900],
      textAlign: "center",
    },
    helpContainer: {
      marginTop: 24,
      alignItems: "center",
    },
    helpText: {
      fontSize: 14,
      color: theme.colors.grey[900],
      marginBottom: 6,
    },
    helpLink: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.secondary.main,
      textDecorationLine: "underline",
    },
    displayCode: {
      padding: theme.spacing.md,
      borderWidth: 1.5,
      borderColor: theme.colors.grey.border,
      width: "100%",
      borderRadius: theme.borderRadius.lg,
      textAlign: "center",
      fontSize: theme.typography.fontSize.xxxl,
      color: theme.colors.secondary.main,
      fontWeight: "bold",
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.md,
      textAlign:'center'
    },
  });
