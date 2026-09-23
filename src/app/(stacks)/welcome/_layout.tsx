import { router, Stack } from "expo-router";
import Header from "@/components/navigation/header/header";
import { t } from "@/i18n";

export default function WelcomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <Header /> }} />
      <Stack.Screen
        name="createTeam"
        options={{
          header: () => (
            <Header
              title={t("welcome.headerCreate")}
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
              title={t("welcome.headerJoin")}
              handlerBack={() => router.dismissTo("/welcome")}
            />
          ),
        }}
      />
    </Stack>
  );
}
