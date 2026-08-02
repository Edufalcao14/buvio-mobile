import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../../theme';
import { EdgeInsets } from 'react-native-safe-area-context';

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.colors.background.default,
      borderRadius: theme.spacing.md,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      elevation: 8,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    tabletModal: {
      width: '80%',
      height: '80%',
      maxWidth: 500,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.primary.main,
      paddingTop: Math.max(theme.spacing.md, insets.top),
      paddingBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    headerTitle: {
      color: theme.colors.text.lightText,
      fontSize: theme.typography.fontSize.xl,
      fontWeight: '700',
    },
    headerSpacer: {
      width: 24,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
    },
    scrollContent: {
      paddingBottom: Math.max(theme.spacing.lg, insets.bottom),
      gap: theme.spacing.lg,
    },
    formTitle: {
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: '700',
      color: theme.colors.primary.main,
      marginBottom: theme.spacing.tiny,
    },
    formSubtitle: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.grey[600],
    },
    sectionGroup: {
      gap: theme.spacing.tiny,
    },
    inputLabel: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: '700',
      color: theme.colors.text.variant,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.input,
      fontSize: theme.typography.fontSize.md,
      backgroundColor: theme.colors.grey[50],
      elevation: 4,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 0.5 },
      shadowOpacity: 0.3,
      shadowRadius: 1.5,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.spacing.xs,
    },
    typeButton: {
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.spacing.xs,
      paddingVertical: theme.spacing.input,
      paddingHorizontal: theme.spacing.sm,
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background.default,
      elevation: 4,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    selectedTypeButton: {
      backgroundColor: theme.colors.primary.light,
      borderColor: theme.colors.primary.main,
    },
    typeButtonText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.grey[600],
    },
    selectedTypeText: {
      color: theme.colors.background.default,
      fontWeight: '700',
    },
    playersSection: {
      gap: theme.spacing.tiny,
    },
    playersSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    playersTitle: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: '700',
      color: theme.colors.text.variant,
    },
    playersCount: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary.main,
    },
    playersSubtitle: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.grey[600],
    },
    playerList: {
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.spacing.xs,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.tiny,
      
    },
    playerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.xs,
      gap: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey[200],
    },
    lastPlayerItem: {
      borderBottomWidth: 0,
    },
    playerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.grey[300],
      justifyContent: 'center',
      alignItems: 'center',
    },
    playerInitials: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: '700',
      color: theme.colors.grey[600],
    },
    playerName: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.variant,
    },
    buttonContainer: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.background.default,
      borderTopWidth: 1,
      borderTopColor: theme.colors.grey[200],
      paddingBottom: Math.max(theme.spacing.md, insets.bottom),
    },
    saveButton: {
      backgroundColor: theme.colors.primary.main,
      borderRadius: theme.spacing.xs,
      paddingVertical: theme.spacing.sm,
      alignItems: 'center',
    },
    saveButtonText: {
      color: theme.colors.text.lightText,
      fontSize: theme.typography.fontSize.md,
      fontWeight: '700',
    },
    fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      right: theme.spacing.md,
      bottom: Math.max(theme.spacing.md, insets.bottom + theme.spacing.tiny),
      backgroundColor: theme.colors.primary.main,
      borderRadius: 28,
      elevation: 8,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
  });