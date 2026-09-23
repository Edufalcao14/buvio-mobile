import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme, isSelected: boolean) =>
  StyleSheet.create({
    card: {
      // Two tiles per row inside a wrapping row with an 8pt gap.
      width: "48%",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: isSelected
        ? theme.colors.success.light
        : theme.colors.background.paper,
      borderWidth: 1,
      borderColor: isSelected
        ? theme.colors.primary.main
        : theme.colors.grey.border,
    },
    ring: {
      borderRadius: 999,
      borderWidth: 2,
      borderColor: isSelected ? theme.colors.primary.main : "transparent",
      padding: 2,
    },
    name: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      maxWidth: "100%",
    },
    check: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 22,
      height: 22,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary.main,
    },
  });
