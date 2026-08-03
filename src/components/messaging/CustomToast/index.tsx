import React from "react";
import { View, Text } from "react-native";
import { BaseToastProps, ToastConfig } from "react-native-toast-message";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./style";

type ToastType = "success" | "error" | "info" | "warning";

interface CustomToastProps extends BaseToastProps {
  type: ToastType;
}

const CustomToast: React.FC<CustomToastProps> = ({ text1, type }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const statusColor = {
    success: theme.colors.success.main,
    error: theme.colors.error.main,
    info: theme.colors.info.main,
    warning: theme.colors.warning.main,
  }[type] ?? theme.colors.info.main;

  return (
    <View style={styles.container}>
      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      <Text style={styles.text} numberOfLines={2}>
        {text1}
      </Text>
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
