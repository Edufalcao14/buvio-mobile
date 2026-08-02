import { router, Stack } from "expo-router";
import { useTheme } from "../../../providers/ThemeProvider";
import Header from "../../../components/navigation/header/header";
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect } from "react";

export default function WelcomeLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <Header /> }} />
      <Stack.Screen
        name="create-team"
        options={{
          header: () => (
            <Header
              title={"Crée"}
              handlerBack={() => router.dismissTo("/welcome")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="join-team"
        options={{
          header: () => (
            <Header
              title={"Rejoindre"}
              handlerBack={() => router.dismissTo("/welcome")}
              backgroundColor={theme.colors.secondary.main}
            />
          ),
        }}
      />
    </Stack>
  );
}
