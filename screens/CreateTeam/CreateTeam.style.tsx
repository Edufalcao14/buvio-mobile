import { StyleSheet } from "react-native";
import { Theme } from "../../theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      display: "flex",
      padding: theme.spacing.xl,
    },
    container: {
      display: "flex",
      gap: theme.spacing.xxl,
    },
    keyboard: {
        flex: 1,
      },
      title: {
        fontSize: theme.typography.fontSize.xxl
        ,
        fontWeight: "bold",
        color: theme.colors.primary.main,
      },
      headerContainer:{
        display:'flex',
        gap: theme.spacing.md
      },
      containerInputs:{
        display:'flex',
        gap: theme.spacing.lg
      },
      errorText: {
        color: theme.colors.error.main,
        fontSize: theme.typography.fontSize.md,
      },
  });
