import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createDatePickerStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.xs,
    },
    label: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 52,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background.paper,
    },
    input: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.lg,
      letterSpacing: theme.typography.letterSpacing.wide,
      color: theme.colors.text.primary,
      paddingVertical: 0,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
    calendarButton: {
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: "center",
      alignItems: "center",
    },
    calendarContainer: {
      backgroundColor: theme.colors.background.elevated,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.md,
      width: "90%",
      maxWidth: 400,
      ...theme.shadows.raised,
    },
    closeButton: {
      marginTop: theme.spacing.md,
      minHeight: 48,
      justifyContent: "center",
      backgroundColor: theme.colors.grey[200],
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
    },
    closeButtonText: {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
    },
  });
