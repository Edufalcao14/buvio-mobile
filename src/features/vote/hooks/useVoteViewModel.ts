import { useCallback, useEffect, useMemo, useState } from "react";
import {
  VoteClosureReason,
  VoteSessionStatus,
  VoteType,
  useCloseVotingSessionMutation,
  useCreateVotingSessionMutation,
  useSubmitVoteMutation,
  useVoteMatchQuery,
  useVotingSessionUpdatedSubscription,
  type VotingSessionStateFragment,
} from "@/graphql/generated/hooks";
import { getErrorMessage } from "@/lib/errors";
import { nicknameOf } from "@/utils/identity";
import { t } from "@/i18n";

/**
 * A player as the vote screens read them: the nickname is the name the squad
 * knows, `displayName` stays for the places that need the real one.
 */
export type VotePlayer = {
  id: string;
  displayName: string;
  nickname: string;
  avatarUrl: string | null;
};

export type VoteTallyRow = {
  player: VotePlayer;
  topCount: number;
  flopCount: number;
};

export type VoteBallotRow = {
  player: VotePlayer;
  isComplete: boolean;
  isMe: boolean;
};

/**
 * What happened to a ballot. The two votes are two mutations, so a half
 * success is a real outcome the screen has to say out loud rather than
 * swallow: the Top is already recorded on the server.
 */
export type BallotOutcome =
  | { status: "success" }
  | { status: "topOnly"; message: string }
  | { status: "failed"; message: string };

/** Which face of the vote the screen should show right now. */
export type VotePhase =
  "loading" | "error" | "noSession" | "ballot" | "live" | "result";

const CLOSURE_LABELS: Record<VoteClosureReason, string> = {
  [VoteClosureReason.Unanimous]: t("vote.closure.unanimous"),
  [VoteClosureReason.Deadline]: t("vote.closure.deadline"),
  [VoteClosureReason.Admin]: t("vote.closure.admin"),
};

export const closureLabel = (
  reason?: VoteClosureReason | null
): string | null => (reason ? CLOSURE_LABELS[reason] : null);

/** Apollo's `errorPolicy: "all"` returns GraphQL errors instead of throwing. */
const failureOf = (
  result: { errors?: readonly unknown[] | null } | null | undefined
): string | null => {
  const errors = result?.errors;

  if (!errors || errors.length === 0) {
    return null;
  }

  return getErrorMessage({ graphQLErrors: errors });
};

const TICK_MS = 1000;

export const useVoteViewModel = (matchId: string) => {
  const { data, loading, error, refetch } = useVoteMatchQuery({
    variables: { matchId },
    skip: !matchId,
    notifyOnNetworkStatusChange: true,
  });

  const session: VotingSessionStateFragment | null =
    data?.getMatchById?.votingSession ?? null;
  const sessionId = session?.id ?? null;

  /*
   * The subscription pushes the whole session on every vote and on close.
   * `VotingSession` carries an `id`, so `InMemoryCache` normalises it and the
   * push overwrites the very object `VoteMatch` points at — the query result
   * stays current with no manual merge. Verified by the cache test in
   * `useVoteViewModel.test.ts`; if the backend ever stops sending `id`, that
   * test fails first.
   */
  const { error: liveError } = useVotingSessionUpdatedSubscription({
    variables: { votingSessionId: sessionId ?? "" },
    skip: !sessionId,
  });

  const [submitVote, { loading: isSubmitting }] = useSubmitVoteMutation();
  const [closeVotingSession, { loading: isClosing }] =
    useCloseVotingSessionMutation();
  const [createVotingSession, { loading: isStarting }] =
    useCreateVotingSessionMutation();

  const me = data?.me ?? null;
  const meId = me?.id ?? null;

  const roster = useMemo<VotePlayer[]>(
    () =>
      (data?.getMatchById?.players ?? []).map((player) => ({
        id: player.id,
        displayName: player.displayName,
        nickname: nicknameOf(player),
        avatarUrl: player.avatarUrl ?? null,
      })),
    [data?.getMatchById?.players]
  );

  // You cannot crown or roast yourself.
  const eligibleForTop = useMemo(
    () => roster.filter((player) => player.id !== meId),
    [roster, meId]
  );

  const eligibleForFlop = useCallback(
    (topPlayerId: string | null) =>
      eligibleForTop.filter((player) => player.id !== topPlayerId),
    [eligibleForTop]
  );

  const myBallot = useMemo(
    () => session?.ballots.find((ballot) => ballot.player.id === meId) ?? null,
    [session, meId]
  );

  const ballots = useMemo<VoteBallotRow[]>(
    () =>
      (session?.ballots ?? []).map((ballot) => ({
        player: {
          id: ballot.player.id,
          displayName: ballot.player.displayName,
          nickname: nicknameOf(ballot.player),
          avatarUrl: ballot.player.avatarUrl ?? null,
        },
        isComplete: ballot.isComplete,
        isMe: ballot.player.id === meId,
      })),
    [session, meId]
  );

  // Loudest first — the running verdict is the point of the live screen.
  const tally = useMemo<VoteTallyRow[]>(
    () =>
      [...(session?.tally ?? [])]
        .map((entry) => ({
          player: {
            id: entry.player.id,
            displayName: entry.player.displayName,
            nickname: nicknameOf(entry.player),
            avatarUrl: entry.player.avatarUrl ?? null,
          },
          topCount: entry.topCount,
          flopCount: entry.flopCount,
        }))
        .sort(
          (a, b) =>
            b.topCount + b.flopCount - (a.topCount + a.flopCount) ||
            a.player.nickname.localeCompare(b.player.nickname)
        ),
    [session]
  );

  const maxTallyCount = useMemo(
    () =>
      tally.reduce(
        (highest, row) => Math.max(highest, row.topCount, row.flopCount),
        0
      ),
    [tally]
  );

  /*
   * The clock ticks locally off `closingAt`, an absolute instant, rather than
   * off the `timeRemaining` snapshot: a socket that reconnects late must not
   * make the deadline jump backwards.
   */
  const closingAt = session?.closingAt ?? null;
  const isOpen = session?.status === VoteSessionStatus.InProgress;
  const [nowMs, setNowMs] = useState(0);

  useEffect(() => {
    if (!closingAt || !isOpen) {
      return;
    }

    const interval = setInterval(() => setNowMs(Date.now()), TICK_MS);

    return () => clearInterval(interval);
  }, [closingAt, isOpen]);

  const secondsRemaining = useMemo(() => {
    if (!session || !isOpen || !closingAt) {
      return null;
    }

    // Before the first tick the server's own snapshot is the best answer.
    if (nowMs === 0) {
      return Math.max(0, session.timeRemaining);
    }

    return Math.max(
      0,
      Math.round((new Date(closingAt).getTime() - nowMs) / 1000)
    );
  }, [session, isOpen, closingAt, nowMs]);

  /**
   * The verdict, read as players rather than raw names: the result screen
   * shows a face and a nickname, exactly like every other social surface.
   */
  const verdict = session?.voteResult ?? null;

  const asVotePlayer = (
    player:
      | {
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        }
      | null
      | undefined
  ): VotePlayer | null =>
    player
      ? {
          id: player.id,
          displayName: player.displayName,
          nickname: nicknameOf(player),
          avatarUrl: player.avatarUrl ?? null,
        }
      : null;

  const isBallotComplete = myBallot?.isComplete ?? false;
  const isAdmin = Boolean(session && meId && session.startedBy.id === meId);

  const submitBallot = useCallback(
    async (
      topId: string,
      topComment: string,
      flopId: string,
      flopComment: string
    ): Promise<BallotOutcome> => {
      if (!sessionId) {
        return { status: "failed", message: t("vote.notOpen") };
      }

      const trim = (comment: string) => {
        const value = comment.trim();
        return value.length > 0 ? value : null;
      };

      try {
        const topResult = await submitVote({
          variables: {
            votingSession: sessionId,
            votedUserId: topId,
            type: VoteType.Top,
            description: trim(topComment),
          },
        });
        const topFailure = failureOf(topResult);

        if (topFailure) {
          return { status: "failed", message: topFailure };
        }
      } catch (cause) {
        return { status: "failed", message: getErrorMessage(cause) };
      }

      try {
        const flopResult = await submitVote({
          variables: {
            votingSession: sessionId,
            votedUserId: flopId,
            type: VoteType.Flop,
            description: trim(flopComment),
          },
        });
        const flopFailure = failureOf(flopResult);

        if (flopFailure) {
          return { status: "topOnly", message: flopFailure };
        }
      } catch (cause) {
        return { status: "topOnly", message: getErrorMessage(cause) };
      }

      // The socket normally brings the new state; refetching covers the case
      // where it is down and keeps the screen honest.
      await refetch();

      return { status: "success" };
    },
    [sessionId, submitVote, refetch]
  );

  const closeSession = useCallback(async (): Promise<string | null> => {
    if (!sessionId) {
      return t("vote.notOpen");
    }

    try {
      const result = await closeVotingSession({
        variables: { votingSessionId: sessionId },
      });

      return failureOf(result);
    } catch (cause) {
      return getErrorMessage(cause);
    }
  }, [sessionId, closeVotingSession]);

  const startSession = useCallback(async (): Promise<string | null> => {
    if (!matchId) {
      return t("vote.matchNotFound");
    }

    try {
      const result = await createVotingSession({ variables: { matchId } });
      const failure = failureOf(result);

      if (failure) {
        return failure;
      }

      await refetch();

      return null;
    } catch (cause) {
      return getErrorMessage(cause);
    }
  }, [matchId, createVotingSession, refetch]);

  const status = session?.status ?? null;

  const phase = useMemo<VotePhase>(() => {
    if (loading && !data) {
      return "loading";
    }

    if (error && !data) {
      return "error";
    }

    if (!session || status === VoteSessionStatus.NotStarted) {
      return "noSession";
    }

    if (status === VoteSessionStatus.Completed) {
      return "result";
    }

    return isBallotComplete ? "live" : "ballot";
  }, [loading, data, error, session, status, isBallotComplete]);

  return {
    phase,
    session,
    status,
    me,
    matchName: data?.getMatchById?.name ?? null,
    matchDate: data?.getMatchById?.date ?? null,
    roster,
    eligibleForTop,
    eligibleForFlop,
    ballots,
    tally,
    maxTallyCount,
    secondsRemaining,
    isBallotComplete,
    isAdmin,
    isSubmitting,
    isClosing,
    isStarting,
    isRefreshing: loading && Boolean(data),
    voteResult: verdict,
    topVerdict: asVotePlayer(verdict?.top),
    flopVerdict: asVotePlayer(verdict?.flop),
    closedReasonLabel: closureLabel(session?.closedReason),
    // A dropped socket must not read as a broken screen: the data on it is
    // still the last server truth, so it is a notice, not the error state.
    liveErrorMessage: liveError ? t("vote.liveInterrupted") : null,
    errorMessage: error && !data ? getErrorMessage(error) : null,
    refetch,
    submitBallot,
    closeSession,
    startSession,
  };
};
