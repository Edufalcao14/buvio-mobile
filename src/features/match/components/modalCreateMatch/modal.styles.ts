import { StyleSheet } from "react-native";
import { Theme } from "@/theme";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: theme.colors.background.default,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...theme.shadows.raised,
    },
    tabletModal: {
      width: "80%",
      height: "80%",
      maxWidth: 500,
      borderRadius: theme.borderRadius.xl,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.primary.main,
      paddingTop: Math.max(theme.spacing.md, insets.top),
      paddingBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderBottomWidth: 3,
      borderBottomColor: theme.colors.secondary.main,
    },
    headerTitle: {
      color: theme.colors.primary.contrastText,
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      letterSpacing: theme.typography.letterSpacing.wide,
    },
    headerSpacer: {
      width: 24,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
    },
    scrollContent: {
      paddingBottom: Math.max(theme.spacing.lg, insets.bottom),
      gap: theme.spacing.lg,
    },
    formTitle: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text.primary,
    },
    formSubtitle: {
      fontSize: theme.typography.fontSize.md,
      lineHeight:
        theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    sectionGroup: {
      gap: theme.spacing.xs,
    },
    inputLabel: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    input: {
      minHeight: 48,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.input,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background.paper,
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
      marginTop: theme.spacing.tiny,
    },
    buttonGroup: {
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    typeButton: {
      minHeight: 44,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.input,
      paddingHorizontal: theme.spacing.sm,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background.paper,
    },
    selectedTypeButton: {
      backgroundColor: theme.colors.primary.light,
      borderColor: theme.colors.primary.light,
    },
    typeButtonText: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: "600",
      color: theme.colors.text.secondary,
    },
    selectedTypeText: {
      color: theme.colors.primary.contrastText,
      fontWeight: "700",
    },
    playersSection: {
      gap: theme.spacing.xs,
    },
    playersSectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    playersTitle: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    playersCount: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: "600",
      color: theme.colors.primary.light,
    },
    playersSubtitle: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight:
        theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
      color: theme.colors.text.secondary,
    },
    playerList: {
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.background.paper,
      paddingHorizontal: theme.spacing.md,
      marginTop: theme.spacing.xs,
    },
    playerItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey[100],
    },
    lastPlayerItem: {
      borderBottomWidth: 0,
    },
    // The roster wears the shared `PlayerAvatar`, so the monogram that used to
    // live here is gone with its styles.
    playerName: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.primary,
    },
    buttonContainer: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.background.default,
      borderTopWidth: 1,
      borderTopColor: theme.colors.grey.border,
      paddingBottom: Math.max(theme.spacing.md, insets.bottom),
    },
    keyboardAvoidingView: {
      flex: 1,
    },
  });
