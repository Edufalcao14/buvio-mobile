import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, BaseToastProps, ToastConfig } from 'react-native-toast-message';
import { useTheme } from '../../../providers/ThemeProvider';
import { createStyles } from './style';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface CustomToastProps extends BaseToastProps {
  type: ToastType;
}

const CustomToast: React.FC<CustomToastProps> = ({ text1, type }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const toastStyles = {
    success: {
      container: { ...styles.container, borderLeftColor: '#43a047' },
      icon: '✅',
      text: { ...styles.text, color: '#2e7031' }
    },
    error: {
      container: { ...styles.container, borderLeftColor: '#e53935' },
      icon: '❌',
      text: { ...styles.text, color: '#c62828' }
    },
    info: {
      container: { ...styles.container, borderLeftColor: '#1e88e5' },
      icon: 'ℹ️',
      text: { ...styles.text, color: '#0d47a1' }
    },
    warning: {
      container: { ...styles.container,  borderLeftColor: '#ffb300' },
      icon: '⚠️',
      text: { ...styles.text, color: '#ef6c00' }
    }
  };

  const toastType = toastStyles[type] || toastStyles.info;

  return (
    <View style={toastType.container}>
      <Text >{toastType.icon}</Text>
      <Text style={toastType.text}>{text1}</Text>
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: (props) => <CustomToast {...props} type="success" />,
  error: (props) => <CustomToast {...props} type="error" />,
  info: (props) => <CustomToast {...props} type="info" />,
  warning: (props) => <CustomToast {...props} type="warning" />,
};

export default CustomToast;