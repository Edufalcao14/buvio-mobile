import { View, ActivityIndicator } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./loading.styles";

export default function LoadingScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.secondary.main} />
    </View>
  );
}
