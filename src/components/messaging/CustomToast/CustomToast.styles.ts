import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

// Paper pill with a status dot — no fat colored border (see DESIGN.md).
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "92%",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.bubble,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.background.paper,
      ...theme.shadows.card,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: theme.borderRadius.round,
    },
    text: {
      flex: 1,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
  });
