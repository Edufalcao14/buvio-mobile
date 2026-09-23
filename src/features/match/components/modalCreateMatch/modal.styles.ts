import { StyleSheet } from "react-native";
import { Theme } from "@/theme";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.overlay },
    keyboardAvoidingView: { flex: 1 },
    modalOverlay: { flex: 1, backgroundColor: theme.colors.overlay },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: Math.max(theme.spacing.sm, insets.top),
      paddingBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    headerTitle: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.grey[200],
      alignItems: "center",
      justifyContent: "center",
    },
    formContainer: { flex: 1, paddingHorizontal: theme.spacing.md },
    scrollContent: {
      paddingTop: theme.spacing.xs,
      paddingBottom: Math.max(theme.spacing.lg, insets.bottom),
      gap: theme.spacing.xl,
    },
    formTitle: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxxl,
      lineHeight:
        theme.typography.fontSize.xxxl * theme.typography.lineHeight.tight,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
    },
    sectionGroup: { gap: theme.spacing.sm },
    inputLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    // The headline field: display type on a hairline, no box.
    nameInput: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey[300],
    },
    nameInputError: { borderBottomColor: theme.colors.error.main },
    errorText: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
    segmented: { height: 40 },
    playersSectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    playersCount: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
    },
    roster: {
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      backgroundColor: theme.colors.background.paper,
    },
    playersSubtitle: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.hint,
    },
    buttonContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: Math.max(theme.spacing.md, insets.bottom),
      backgroundColor: theme.colors.background.default,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.grey.border,
    },
  });
