import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // The vestiaire stage: green owns the screen; the form is the white
    // team sheet sliding up under the mascot (see DESIGN.md).
    screen: {
      flex: 1,
      backgroundColor: theme.colors.primary.main,
    },
    keyboard: {
      flex: 1,
    },
    sheet: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: "hidden",
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },
    sheetTitle: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.tiny,
      paddingRight: 96,
    },
    formContainer: {
      gap: theme.spacing.md,
      paddingTop: theme.spacing.lg,
    },
    inputContainer: {
      gap: theme.spacing.md,
      paddingTop: theme.spacing.md,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
    textLink: {
      alignSelf: "center",
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
    },
    link: {
      textDecorationLine: "underline",
      fontWeight: "600",
      color: theme.colors.primary.light,
    },
  });
