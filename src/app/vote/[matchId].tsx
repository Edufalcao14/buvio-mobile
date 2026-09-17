import { useLocalSearchParams, useRouter } from "expo-router";
import { VoteScreen } from "@/features/vote";

export default function VoteRoute() {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const router = useRouter();

  return (
    <VoteScreen
      matchId={matchId ?? ""}
      onClose={() => {
        if (router.canGoBack()) {
          router.back();
          return;
        }

        router.replace("/(tabs)/team/match");
      }}
    />
  );
}
