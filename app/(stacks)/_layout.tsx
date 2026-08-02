// app/(team)/_layout.tsx

import { router, Stack, Redirect } from "expo-router";
import Header from "../../components/navigation/header/header";
import { useTheme } from "../../providers/ThemeProvider";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect } from "react";

export default function StackLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="auth" />
      <Stack.Screen name="welcome" />
    </Stack>
  );
}
