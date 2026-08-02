// app/_layout.tsx
import { Stack } from "expo-router";
import { ApolloProvider } from "../providers/apollo/ApolloProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { AuthProvider } from "../providers/AuthProvider";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/messaging/CustomToast";

export default function RootLayout() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
