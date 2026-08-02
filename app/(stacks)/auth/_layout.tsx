// app/_layout.tsx
import { Stack } from "expo-router";
import Header from "../../../components/navigation/header/header";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <Header />,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="signIn" />
    </Stack>
  );
}
