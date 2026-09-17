import { router, Stack } from "expo-router";
import Header from "@/components/navigation/header/header";

export default function WelcomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <Header /> }} />
      <Stack.Screen
        name="createTeam"
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
        name="joinTeam"
        options={{
          header: () => (
            <Header
              title={"Rejoindre"}
              handlerBack={() => router.dismissTo("/welcome")}
            />
          ),
        }}
      />
    </Stack>
  );
}
