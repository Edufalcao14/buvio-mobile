import { StyleSheet } from "react-native";
import { Theme } from "@/theme";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    scrollContent: {
      paddingTop: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: Math.max(theme.spacing.lg, insets.bottom),
    },
    textContainer: {
      flexDirection: "column",
      gap: theme.spacing.md,
      paddingTop: insets.top > 0 ? 0 : theme.spacing.md,
    },
    cardContainer: {
      width: "100%",
      gap: theme.spacing.lg,
      alignItems: "center",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      textAlign: "center",
      color: theme.colors.text.primary,
    },
    descriptionHeader: {
      textAlign: "center",
      marginHorizontal: theme.spacing.lg,
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
  });
