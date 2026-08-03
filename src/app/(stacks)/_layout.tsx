// app/(team)/_layout.tsx

import { Stack } from "expo-router";

export default function StackLayout() {

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
