import { useMemo } from "react";
import { useTeamRankingQuery } from "@/graphql/generated/hooks";
import { useAuth } from "@/providers/AuthProvider";
import { nicknameOf } from "@/utils/identity";
import { tierOf, nextTierGap, type TrophyTier } from "../gamification";
import { t } from "@/i18n";

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

/** The signed-in player's own line in the season, for the "Ma saison" card. */
export type MyStanding = {
  /** 1-based place in the Top race among players with at least one Top; null when none yet. */
  rank: number | null;
  teamSize: number;
  topCount: number;
  flopCount: number;
  tier: TrophyTier | null;
  /** Tops still needed for the next tier; null at the last one. */
  nextTierGap: number | null;
};

export const useRankingViewModel = () => {
  const { userData } = useAuth();
  const { data, loading, error, refetch } = useTeamRankingQuery({
    notifyOnNetworkStatusChange: true,
  });

  const { topPodium, flopPodium, hasVerdicts, mine } = useMemo(() => {
    const standings = data?.teamRanking ?? [];

    // One podium per category: the standings answer "who collected the most
    // tops" and "the most flops", and those are two different races.
    const podiumOf = (pick: (standing: (typeof standings)[number]) => number) =>
      standings
        .filter((standing) => pick(standing) > 0)
        .sort(
          (a, b) =>
            pick(b) - pick(a) ||
            nicknameOf(a.player).localeCompare(nicknameOf(b.player))
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

    // My place in the Top race, over the whole team — not just the podium.
    const me = standings.find(
      (standing) => standing.player.id === userData?.id
    );
    const topRace = standings
      .filter((standing) => standing.topCount > 0)
      .sort((a, b) => b.topCount - a.topCount);
    const myRankIndex = me
      ? topRace.findIndex((s) => s.player.id === me.player.id)
      : -1;
    const myStanding: MyStanding | null = me
      ? {
          rank: myRankIndex >= 0 ? myRankIndex + 1 : null,
          teamSize: standings.length,
          topCount: me.topCount,
          flopCount: me.flopCount,
          tier: tierOf(me.topCount),
          nextTierGap: nextTierGap(me.topCount),
        }
      : null;

    return {
      topPodium: tops,
      flopPodium: flops,
      hasVerdicts: tops.length > 0 || flops.length > 0,
      mine: myStanding,
    };
  }, [data, userData]);

  return {
    topPodium,
    flopPodium,
    hasVerdicts,
    mine,
    isLoading: loading && !data,
    isRefreshing: loading && !!data,
    errorMessage: error ? t("ranking.error") : null,
    refetch,
  };
};
