import { Redirect } from "expo-router";
import LoadingScreen from "@/components/indicators/loadingScreen/loading";
import { useAuth } from "@/providers/AuthProvider";

export default function Index() {
  const { isAuthenticated, _hasHydrated, userData } = useAuth();

  if (!_hasHydrated) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    if (userData && userData.team?.id) {
      return <Redirect href="/(tabs)/team" />;
    }
    return <Redirect href="/(stacks)/welcome" />;
  }
  return <Redirect href="/(stacks)/auth" />;
}
