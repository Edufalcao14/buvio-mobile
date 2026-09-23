import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

// An elevated strip with a status dot — floats over paper, so it uses the
// one raised shadow the system allows.
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "92%",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.background.elevated,
      ...theme.shadows.raised,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: theme.borderRadius.round,
    },
    text: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
    },
  });
