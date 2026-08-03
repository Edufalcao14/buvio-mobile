import { useMemo } from "react";
import { useTeamRankingQuery } from "@/graphql/generated/hooks";
import { useAuth } from "@/providers/AuthProvider";
import { nicknameOf } from "@/utils/identity";

/** How many players stand on each podium. */
export const PODIUM_SIZE = 3;

export type PodiumEntry = {
  id: string;
  rank: number;
  /** The name the squad knows this player by — the standings are social. */
  nickname: string;
  avatarUrl: string | null;
  count: number;
  isCurrentUser: boolean;
};

export const useRankingViewModel = () => {
  const { userData } = useAuth();
  const { data, loading, error, refetch } = useTeamRankingQuery({
    notifyOnNetworkStatusChange: true,
  });

  const { topPodium, flopPodium, hasVerdicts } = useMemo(() => {
    const standings = data?.teamRanking ?? [];

    // One podium per category: the standings answer "who collected the most
    // tops" and "the most flops", and those are two different races.
    const podiumOf = (pick: (standing: (typeof standings)[number]) => number) =>
      standings
        .filter((standing) => pick(standing) > 0)
        .sort(
          (a, b) =>
            pick(b) - pick(a) ||
            nicknameOf(a.player).localeCompare(nicknameOf(b.player)),
        )
        .slice(0, PODIUM_SIZE)
        .map((standing, index) => ({
          id: standing.player.id,
          rank: index + 1,
          nickname: nicknameOf(standing.player),
          avatarUrl: standing.player.avatarUrl ?? null,
          count: pick(standing),
          isCurrentUser: standing.player.id === userData?.id,
        }));

    const tops = podiumOf((standing) => standing.topCount);
    const flops = podiumOf((standing) => standing.flopCount);

    return {
      topPodium: tops,
      flopPodium: flops,
      hasVerdicts: tops.length > 0 || flops.length > 0,
    };
  }, [data, userData]);

  return {
    topPodium,
    flopPodium,
    hasVerdicts,
    isLoading: loading && !data,
    isRefreshing: loading && !!data,
    errorMessage: error ? "Impossible de charger le classement." : null,
    refetch,
  };
};
