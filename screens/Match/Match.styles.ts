import { StyleSheet } from "react-native";
import { Theme } from "../../theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: "bold",
    },
    fab: {
      position: 'absolute',
      right: theme.spacing.md,
      bottom: theme.spacing.md,
      width: 56,
      height: 56,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.primary.main,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    fabText: {
      color: theme.colors.text.lightText,
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: 'bold',
    },
  });