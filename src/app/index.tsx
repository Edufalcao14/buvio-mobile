import { Redirect } from "expo-router";
import LoadingScreen from "@/components/indicators/loadingScreen/loading";
import { useAuth } from "@/providers/AuthProvider";

export default function Index() {
  const { isAuthenticated, isLoading, userData } = useAuth();

  // Gated on isLoading, which is true until the stored session has been read.
  // The previous flag was set to `true` before the read and `false` after it,
  // so this branch never ran and a signed-in user was bounced to the sign-in
  // screen for the moment it took to restore their session.
  if (isLoading) {
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
