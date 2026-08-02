import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme';

export const createDatePickerStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      // Styles for the main container of the date picker
      gap: theme.spacing.tiny,
    },
    label: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: '700',
      color: theme.colors.text.variant,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      borderRadius: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.input,
      backgroundColor: theme.colors.grey[50],
      elevation: 4,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
     input: {
      flex: 1,
      fontSize: theme.typography.fontSize.md,
      paddingVertical: 0, // Remove vertical padding as it's handled by inputContainer
    },
    inputError: {
      borderColor: theme.colors.error.main,
    },
    errorText: {
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
      marginTop: theme.spacing.tiny,
    },
    calendarButton: {
      paddingLeft: theme.spacing.tiny, // Add padding left instead of right on icon container
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarContainer: {
      backgroundColor: 'white',
      borderRadius: theme.spacing.md,
      padding: theme.spacing.md,
      width: '90%',
      maxWidth: 400,
      elevation: 8,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    closeButton: {
      marginTop: theme.spacing.md,
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.primary.main,
      borderRadius: theme.spacing.xs,
      alignItems: 'center',
    },
    closeButtonText: {
      color: theme.colors.primary.contrastText,
      fontSize: theme.typography.fontSize.md,
      fontWeight: '600',
    },
  }); 