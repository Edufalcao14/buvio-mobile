import { StyleSheet } from "react-native";
import { Theme } from "@/theme";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    hero: {
      backgroundColor: theme.colors.primary.main,
      paddingTop: insets.top + theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
      // Let the goat overlap the sheet rendered after the hero.
      zIndex: 10,
    },
    wordmark: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.secondary.main,
      letterSpacing: theme.typography.letterSpacing.wide,
    },
    title: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxxl,
      lineHeight:
        theme.typography.fontSize.xxxl * theme.typography.lineHeight.tight,
      color: theme.colors.primary.contrastText,
      marginTop: theme.spacing.sm,
      // Leave the right lane to the goat.
      paddingRight: 118,
    },
    titleAccent: {
      color: theme.colors.secondary.main,
    },
    // The goat leans over the sheet's edge — sized to overflow the hero
    // and overlap the sheet below (hero must not clip).
    goat: {
      position: "absolute",
      right: theme.spacing.xs,
      bottom: -64,
      width: 110,
      height: 210,
      transform: [{ rotate: "5deg" }],
      zIndex: 2,
    },
  });
