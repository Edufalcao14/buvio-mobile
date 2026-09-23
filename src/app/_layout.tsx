// app/_layout.tsx
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useReducedMotion } from "react-native-reanimated";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
} from "@expo-google-fonts/barlow";
import {
  BarlowSemiCondensed_500Medium,
  BarlowSemiCondensed_600SemiBold,
  BarlowSemiCondensed_700Bold,
} from "@expo-google-fonts/barlow-semi-condensed";
import { ApolloProvider } from "@/providers/apollo/ApolloProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Toast from "react-native-toast-message";
import { ErrorBoundary } from "@/lib/monitoring/ErrorBoundary";
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
  // Screen transitions stay the platform's own; reduced motion swaps the
  // push for a fade rather than removing it.
  const reducedMotion = useReducedMotion();
  const [fontsLoaded, fontError] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
    BarlowSemiCondensed_500Medium,
    BarlowSemiCondensed_600SemiBold,
    BarlowSemiCondensed_700Bold,
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
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={revealApp}>
      <ErrorBoundary>
        <ApolloProvider>
          <AuthProvider>
            <ThemeProvider>
              {/* Dark-locked ground — the status bar is always light-on-dark. */}
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: reducedMotion ? "fade" : "default",
                }}
              />
              <Toast config={toastConfig} />
            </ThemeProvider>
          </AuthProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
