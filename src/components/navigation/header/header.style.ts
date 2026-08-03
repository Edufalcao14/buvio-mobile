import { StyleSheet } from "react-native";
import { Theme } from "@/theme";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.primary.main,
      ...theme.shadows.card,
    },
    // Identity left, actions right — the club is the subject of this bar.
    bar: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingTop: insets.top + theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    identity: {
      flex: 1,
      gap: theme.spacing.tiny,
    },
    title: {
      color: theme.colors.primary.contrastText,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
    },
    codePill: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.tiny,
      paddingVertical: 3,
      paddingHorizontal: theme.spacing.xs,
      borderRadius: theme.borderRadius.round,
      backgroundColor: "rgba(249, 249, 249, 0.16)",
    },
    codePillPressed: {
      backgroundColor: "rgba(249, 249, 249, 0.3)",
    },
    codeText: {
      color: theme.colors.primary.contrastText,
      fontFamily: theme.typography.fontFamily.displaySemiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: 1.5,
    },
    iconButton: {
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    clubStripe: {
      height: 3,
      backgroundColor: theme.colors.secondary.main,
    },
  });

export const createCrestStyles = (theme: Theme, size: number) =>
  StyleSheet.create({
    crest: {
      width: size,
      height: size,
      borderRadius: theme.borderRadius.round,
      borderWidth: 2,
      borderColor: theme.colors.primary.contrastText,
      backgroundColor: theme.colors.primary.dark,
      justifyContent: "center",
      alignItems: "center",
      // An uploaded crest fills the disc edge to edge; the white ring stays.
      overflow: "hidden",
    },
    badge: {
      width: "100%",
      height: "100%",
    },
    initials: {
      color: theme.colors.primary.contrastText,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: size * 0.38,
      // Baloo sits high in its box; nudge the monogram back to optical centre.
      marginTop: size * 0.04,
    },
  });
