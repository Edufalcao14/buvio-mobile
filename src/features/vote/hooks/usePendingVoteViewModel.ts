import { useMemo } from "react";
import {
  VoteSessionStatus,
  useTeamVoteStateQuery,
} from "@/graphql/generated/hooks";

export type PendingVote = {
  matchId: string;
  matchName: string;
};

/**
 * Whether the squad owes *this* player a vote right now.
 *
 * Public API of the vote feature (see `src/features/vote/index.ts`): the
 * Matchs screen needs the answer to decide whether to show the vote CTA, and
 * that is the only thing it is allowed to know about voting.
 */
export const usePendingVoteViewModel = () => {
  const { data, loading, error } = useTeamVoteStateQuery({
    // A vote opened while the tab was in the background must show up when the
    // player comes back to it.
    fetchPolicy: "cache-and-network",
  });

  const pendingVote = useMemo<PendingVote | null>(() => {
    const meId = data?.me.id;
    const matches = data?.me.team?.matches ?? [];

    if (!meId) {
      return null;
    }

    const candidates = matches
      .filter((match) => match !== null)
      .filter((match) => {
        const votingSession = match.votingSession;

        if (votingSession?.status !== VoteSessionStatus.InProgress) {
          return false;
        }

        const myBallot = votingSession.ballots.find(
          (ballot) => ballot.player.id === meId
        );

        // No ballot at all means this player is not on the roster: nothing
        // owed. A ballot that is not complete is exactly what the CTA is for.
        return Boolean(myBallot) && !myBallot?.isComplete;
      })
      // Several matches can be open at once; the freshest one is the one the
      // team is actually talking about.
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const match = candidates[0];

    return match ? { matchId: match.id, matchName: match.name } : null;
  }, [data]);

  return {
    pendingVote,
    // The CTA is additive chrome: while it loads, or if the query fails, the
    // screen simply does not offer it.
    isLoading: loading && !data,
    hasFailed: Boolean(error && !data),
  };
};
