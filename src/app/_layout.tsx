// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from "@expo-google-fonts/baloo-2";
import { ApolloProvider } from "@/providers/apollo/ApolloProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/messaging/CustomToast";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider>
      <AuthProvider>
        <ThemeProvider>
          {/* Chrome is Verde Gramado in both schemes — status bar stays light. */}
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }} />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
