// app/_layout.tsx
import { useCallback } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
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

/*
 * Hold the native splash until the app can actually draw itself.
 *
 * Without this the splash hides the moment JS starts, while the tree below is
 * still `null` waiting on fonts — so the mascot was followed by a blank flash
 * before the first screen appeared. Holding it means the splash IS the loading
 * state, and it crossfades straight into the app.
 */
void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 350 });

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });

  // Hidden on the layout pass that first renders content, not in an effect that
  // could fire while the tree is still empty.
  const revealApp = useCallback(() => {
    void SplashScreen.hideAsync();
  }, []);

  // A font that fails to load is not worth a permanent splash: the system face
  // is a legible fallback, so the app opens either way.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={revealApp}>
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
    </View>
  );
}
