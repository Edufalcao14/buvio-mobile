import { StyleSheet } from "react-native";
import { Theme } from "../../theme";
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
      paddingTop: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: Math.max(theme.spacing.lg, insets.bottom),
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing.md,
      paddingTop: insets.top > 0 ? 0 : theme.spacing.md,
    },
    cardContainer: {
      display: "flex",
      width: "100%",
      gap: theme.spacing.xxl,
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.colors.primary.main,
    },
    descriptionHeader: {
      textAlign: "center",
      margin: theme.spacing.lg,
      marginTop: theme.spacing.sm,
      fontSize: theme.spacing.md
    },
  });