import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createDatePickerStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.xs,
    },
    label: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 48,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.input,
      backgroundColor: theme.colors.background.paper,
    },
    input: {
      flex: 1,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      paddingVertical: 0,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    errorText: {
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
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.md,
      width: "90%",
      maxWidth: 400,
      ...theme.shadows.raised,
    },
    closeButton: {
      marginTop: theme.spacing.md,
      minHeight: 44,
      justifyContent: "center",
      backgroundColor: theme.colors.primary.main,
      borderRadius: theme.borderRadius.lg,
      alignItems: "center",
    },
    closeButtonText: {
      color: theme.colors.primary.contrastText,
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
    },
  });
