import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    // Green chrome, as everywhere else the app owns the top of the screen.
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      backgroundColor: theme.colors.primary.main,
    },
    backButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.round,
    },
    topBarTitle: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.primary.contrastText,
    },
    body: {
      flex: 1,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    stateText: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    action: {
      alignSelf: "stretch",
      paddingHorizontal: theme.spacing.xl,
    },
    notice: {
      marginHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.warning.light,
    },
    noticeText: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.warning.main,
    },
  });
