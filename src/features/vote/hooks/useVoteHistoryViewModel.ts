import { useMemo } from "react";
import { VoteType, useMatchVoteHistoryQuery } from "@/graphql/generated/hooks";
import { getErrorMessage } from "@/lib/errors";
import { nicknameOf } from "@/utils/identity";
import type { VotePlayer } from "./useVoteViewModel";

/** One ballot line: who cast it, which way, and what they said about it. */
export type VoteHistoryEntry = {
  id: string;
  kind: "top" | "flop";
  /** The optional comment. `null` is a real, common answer — not a hole. */
  comment: string | null;
  voter: VotePlayer;
  /** Repeated on the entry so a row can name its target on its own. */
  voted: VotePlayer;
  createdAt: string;
};

/** Everything the squad said about one player. */
export type VoteHistoryGroup = {
  player: VotePlayer;
  topCount: number;
  flopCount: number;
  entries: VoteHistoryEntry[];
};

const asPlayer = (player: {
  id: string;
  displayName: string;
  nickname?: string | null;
  avatarUrl?: string | null;
}): VotePlayer => ({
  id: player.id,
  displayName: player.displayName,
  nickname: nicknameOf(player),
  avatarUrl: player.avatarUrl ?? null,
});

const trimmed = (comment?: string | null): string | null => {
  const value = comment?.trim() ?? "";

  return value.length > 0 ? value : null;
};

/**
 * The full ballot history of one match, grouped by the player who received
 * the votes.
 *
 * Grouping by recipient rather than listing chronologically is what turns a
 * log into the story of the match: the comments about one player sit
 * together, so the squad reads "what was said about Sofiane" instead of
 * hopping between names line by line.
 *
 * The query is lazy — `enabled` stays false until the player actually asks
 * for the list — because this data is only ever read on a closed, frozen
 * session and has no business on the live path (see vote-queries.graphql).
 */
export const useVoteHistoryViewModel = (matchId: string, enabled: boolean) => {
  const { data, loading, error, refetch } = useMatchVoteHistoryQuery({
    variables: { matchId },
    skip: !enabled || !matchId,
  });

  const votes = data?.getMatchById?.votingSession?.votes ?? null;

  const groups = useMemo<VoteHistoryGroup[]>(() => {
    if (!votes) {
      return [];
    }

    const byPlayer = new Map<string, VoteHistoryGroup>();

    for (const vote of votes) {
      const voted = asPlayer(vote.voted);
      const group = byPlayer.get(voted.id) ?? {
        player: voted,
        topCount: 0,
        flopCount: 0,
        entries: [],
      };
      const kind = vote.type === VoteType.Top ? "top" : "flop";

      group.entries.push({
        id: vote.id,
        kind,
        comment: trimmed(vote.description),
        voter: asPlayer(vote.voter),
        voted,
        createdAt: vote.createdAt,
      });

      if (kind === "top") {
        group.topCount += 1;
      } else {
        group.flopCount += 1;
      }

      byPlayer.set(voted.id, group);
    }

    for (const group of byPlayer.values()) {
      // Tops before Flops inside a player's block — the praise opens, the
      // roast answers it — then oldest first so the banter reads in order.
      group.entries.sort(
        (a, b) =>
          Number(a.kind === "flop") - Number(b.kind === "flop") ||
          a.createdAt.localeCompare(b.createdAt)
      );
    }

    // The most-talked-about player leads: that is where the story is.
    return [...byPlayer.values()].sort(
      (a, b) =>
        b.entries.length - a.entries.length ||
        b.topCount - a.topCount ||
        a.player.nickname.localeCompare(b.player.nickname)
    );
  }, [votes]);

  const totalVotes = votes?.length ?? 0;

  return {
    groups,
    totalVotes,
    /*
     * A closed session with no ballot at all is a real outcome, and only
     * knowable once the query has answered — never while it is still loading.
     * Keyed on `data` rather than on `votes` so that a match with no session
     * at all lands on the empty state too, instead of on a blank list.
     */
    isEmpty: Boolean(data) && totalVotes === 0,
    isLoading: loading && !data,
    errorMessage: error && !data ? getErrorMessage(error) : null,
    refetch,
  };
};
