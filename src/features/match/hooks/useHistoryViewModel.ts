import { useCallback, useMemo, useState } from "react";
import { format, isFuture } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { currentLocale, t } from "@/i18n";

import {
  MatchType,
  VoteSessionStatus,
  useTeamHistoryQuery,
} from "@/graphql/generated/hooks";
import { nicknameOf } from "@/utils/identity";
import { deriveStreak, type Streak } from "@/features/team/gamification";

// Month names and day labels follow the app locale, not the device region.
const dateLocale = () => (currentLocale() === "fr" ? fr : enUS);

/** What the squad decided about a match, or why it decided nothing yet. */
export type MatchOutcome =
  | { kind: "result"; topName: string; flopName: string }
  | { kind: "voting" }
  | { kind: "notStarted" }
  | { kind: "noVotes" }
  | { kind: "upcoming" };

/**
 * Tag styling roles. `honours` is the only gold-bearing one — the crown is
 * the MVP medallion in pill form, and DESIGN.md keeps gold for honours.
 * `live` borrows the error/live colour so a running vote reads as urgent
 * without stealing the gold.
 */
export type MatchTagVariant = "neutral" | "live" | "honours";

export type MatchTag = {
  /** Stable within a card — used as the list key. */
  id: string;
  label: string;
  variant: MatchTagVariant;
};

export type HistoryMatch = {
  id: string;
  name: string;
  dayLabel: string;
  monthLabel: string;
  playerCount: number;
  outcome: MatchOutcome;
  /** Everything the card shows as a chip, in reading order. */
  tags: MatchTag[];
};

export type HistorySection = {
  title: string;
  matchCount: number;
  data: HistoryMatch[];
};

export type HistorySummary = {
  matchCount: number;
  decidedCount: number;
  /** Votes still open — the only part of a history that can still move. */
  liveCount: number;
  /** The same player crowned Top on the latest decided nights, when ≥ 2. */
  streak: Streak | null;
};

const MATCH_TYPE_LABELS: Record<MatchType, string> = {
  [MatchType.Amical]: t("history.types.amical"),
  [MatchType.Tournoi]: t("history.types.tournoi"),
  [MatchType.Championnat]: t("history.types.championnat"),
};

const toOutcome = (
  date: Date,
  votingSession: {
    status: VoteSessionStatus;
    voteResult?: {
      top: { displayName: string; nickname?: string | null };
      flop: { displayName: string; nickname?: string | null };
    } | null;
  } | null
): MatchOutcome => {
  if (!votingSession) {
    // A match that has not been played yet is waiting, not neglected.
    return isFuture(date) ? { kind: "upcoming" } : { kind: "notStarted" };
  }

  if (votingSession.status !== VoteSessionStatus.Completed) {
    return { kind: "voting" };
  }

  // A closed session with no result means nobody filled both categories —
  // distinct from a session still open, and the screen says so.
  if (!votingSession.voteResult) {
    return { kind: "noVotes" };
  }

  return {
    kind: "result",
    topName: nicknameOf(votingSession.voteResult.top),
    flopName: nicknameOf(votingSession.voteResult.flop),
  };
};

/** One tag per outcome, so the card always states where the vote stands. */
const OUTCOME_TAGS: Record<
  MatchOutcome["kind"],
  { label: string; variant: MatchTagVariant }
> = {
  result: { label: t("history.tags.finished"), variant: "neutral" },
  voting: { label: t("history.tags.voting"), variant: "live" },
  notStarted: { label: t("history.tags.notStarted"), variant: "neutral" },
  noVotes: { label: t("history.tags.noVotes"), variant: "neutral" },
  upcoming: { label: t("history.tags.upcoming"), variant: "neutral" },
};

/**
 * Tags are derived from what the server actually returned — a match never
 * wears a verdict tag before the vote is closed with a result.
 */
const toTags = (typeLabel: string, outcome: MatchOutcome): MatchTag[] => {
  const status = OUTCOME_TAGS[outcome.kind];
  const tags: MatchTag[] = [
    { id: "type", label: typeLabel, variant: "neutral" },
    { id: "status", label: status.label, variant: status.variant },
  ];

  if (outcome.kind === "result") {
    tags.push({
      id: "top",
      label: t("history.tags.top", { name: outcome.topName }),
      variant: "honours",
    });
    tags.push({
      id: "flop",
      label: t("history.tags.flop", { name: outcome.flopName }),
      variant: "neutral",
    });
  }

  return tags;
};

const capitalise = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * How many matches a page holds. Comfortably more than one screenful, so the
 * next page is fetched well before the player reaches the end of the list.
 */
export const HISTORY_PAGE_SIZE = 20;

export const useHistoryViewModel = () => {
  const { data, loading, error, refetch, fetchMore } = useTeamHistoryQuery({
    variables: { limit: HISTORY_PAGE_SIZE, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const loadedCount = data?.me.team?.matches?.length ?? 0;
  // A short page means the archive is exhausted; asking again would return
  // nothing and the list would spin forever at the bottom.
  const hasMore = loadedCount > 0 && loadedCount % HISTORY_PAGE_SIZE === 0;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      await fetchMore({
        variables: { limit: HISTORY_PAGE_SIZE, offset: loadedCount },
        updateQuery: (previous, { fetchMoreResult }) => {
          const older = fetchMoreResult?.me.team?.matches ?? [];

          if (!previous.me.team || older.length === 0) {
            return previous;
          }

          return {
            ...previous,
            me: {
              ...previous.me,
              team: {
                ...previous.me.team,
                matches: [...(previous.me.team.matches ?? []), ...older],
              },
            },
          };
        },
      });
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchMore, hasMore, isLoadingMore, loadedCount]);

  const { sections, summary } = useMemo(() => {
    const rawMatches = data?.me.team?.matches ?? [];
    const matches: HistoryMatch[] = [];
    // The backend already orders matches newest first, so grouping in order
    // keeps the sections in order too.
    const grouped: HistorySection[] = [];

    for (const match of rawMatches) {
      if (!match) {
        continue;
      }

      const date = new Date(match.date);
      const typeLabel = MATCH_TYPE_LABELS[match.type];
      const outcome = toOutcome(date, match.votingSession ?? null);
      const item: HistoryMatch = {
        id: match.id,
        name: match.name,
        dayLabel: format(date, "d", { locale: dateLocale() }),
        monthLabel: format(date, "MMM", { locale: dateLocale() }).replace(
          ".",
          ""
        ),
        playerCount: match.players.length,
        outcome,
        tags: toTags(typeLabel, outcome),
      };

      matches.push(item);

      const sectionTitle = capitalise(
        format(date, "MMMM yyyy", { locale: dateLocale() })
      );
      const lastSection = grouped[grouped.length - 1];

      if (lastSection?.title === sectionTitle) {
        lastSection.data.push(item);
        lastSection.matchCount += 1;
      } else {
        grouped.push({ title: sectionTitle, matchCount: 1, data: [item] });
      }
    }

    return {
      sections: grouped,
      summary: {
        matchCount: matches.length,
        decidedCount: matches.filter((match) => match.outcome.kind === "result")
          .length,
        liveCount: matches.filter((match) => match.outcome.kind === "voting")
          .length,
        // Matches arrive newest first, which is the order the streak reads.
        streak: deriveStreak(matches.map((match) => match.outcome)),
      } satisfies HistorySummary,
    };
  }, [data]);

  return {
    teamName: data?.me.team?.name ?? null,
    sections,
    summary,
    // The first load owns the empty screen; a pull-to-refresh must not blank
    // the list that is already on it.
    isLoading: loading && !data,
    isRefreshing: loading && !!data && !isLoadingMore,
    isLoadingMore,
    hasMore,
    loadMore,
    errorMessage: error ? t("history.error") : null,
    refetch,
  };
};
