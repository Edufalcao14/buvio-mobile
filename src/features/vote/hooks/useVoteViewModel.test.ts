import { InMemoryCache } from "@apollo/client";
import {
  VoteClosureReason,
  VoteMatchDocument,
  VoteSessionStatus,
  VotingSessionUpdatedDocument,
  type VoteMatchQuery,
} from "@/graphql/generated/hooks";
import { closureLabel } from "./useVoteViewModel";

const MATCH_ID = "match-1";
const SESSION_ID = "session-1";

const player = (
  id: string,
  displayName: string,
  nickname: string | null = null
) => ({
  __typename: "User" as const,
  id,
  displayName,
  nickname,
  avatarUrl: null,
});

const session = (
  overrides: Partial<{
    ballots: unknown[];
    tally: unknown[];
    status: VoteSessionStatus;
    closedReason: VoteClosureReason | null;
    voteResult: unknown;
  }> = {}
) => ({
  __typename: "VotingSession" as const,
  id: SESSION_ID,
  status: VoteSessionStatus.InProgress,
  timeRemaining: 600,
  closingAt: "2026-08-03T21:00:00.000Z",
  closedAt: null,
  closedReason: null,
  startedBy: {
    __typename: "User" as const,
    id: "user-1",
    displayName: "Camille",
    nickname: null,
  },
  match: {
    __typename: "Match" as const,
    id: MATCH_ID,
    name: "Match du dimanche",
    date: "2026-08-03T18:00:00.000Z",
  },
  ballots: [
    {
      __typename: "BallotProgress" as const,
      player: player("user-1", "Camille"),
      hasTop: false,
      hasFlop: false,
      isComplete: false,
    },
  ],
  tally: [
    {
      __typename: "TallyEntry" as const,
      player: player("user-2", "Sofiane"),
      topCount: 0,
      flopCount: 0,
    },
  ],
  voteResult: null,
  ...overrides,
});

const queryData = () => ({
  me: {
    __typename: "Me" as const,
    id: "user-1",
    displayName: "Camille",
    nickname: null,
    avatarUrl: null,
  },
  getMatchById: {
    __typename: "Match" as const,
    id: MATCH_ID,
    name: "Match du dimanche",
    date: "2026-08-03T18:00:00.000Z",
    type: "AMICAL",
    players: [player("user-1", "Camille"), player("user-2", "Sofiane")],
    votingSession: session(),
  },
});

/**
 * The ViewModel leans on one assumption: the subscription pushes the whole
 * session and the cache absorbs it by identity, so `VoteMatch` stays current
 * without a manual merge. This asserts exactly that, the way Apollo does it
 * (subscription results are written under `ROOT_SUBSCRIPTION`).
 */
describe("voting session cache identity", () => {
  const writeSubscription = (cache: InMemoryCache, data: unknown) =>
    cache.write({
      query: VotingSessionUpdatedDocument,
      dataId: "ROOT_SUBSCRIPTION",
      variables: { votingSessionId: SESSION_ID },
      result: data,
    });

  it("updates the query result when the subscription pushes a new state", () => {
    const cache = new InMemoryCache();

    cache.writeQuery({
      query: VoteMatchDocument,
      variables: { matchId: MATCH_ID },
      data: queryData(),
    });

    writeSubscription(cache, {
      votingSessionUpdated: session({
        ballots: [
          {
            __typename: "BallotProgress",
            player: player("user-1", "Camille"),
            hasTop: true,
            hasFlop: true,
            isComplete: true,
          },
        ],
        tally: [
          {
            __typename: "TallyEntry",
            player: player("user-2", "Sofiane"),
            topCount: 3,
            flopCount: 1,
          },
        ],
      }),
    });

    const result = cache.readQuery<VoteMatchQuery>({
      query: VoteMatchDocument,
      variables: { matchId: MATCH_ID },
    });

    expect(result?.getMatchById.votingSession?.ballots[0].isComplete).toBe(
      true
    );
    expect(result?.getMatchById.votingSession?.tally[0].topCount).toBe(3);
  });

  it("carries a closure through to the query result", () => {
    const cache = new InMemoryCache();

    cache.writeQuery({
      query: VoteMatchDocument,
      variables: { matchId: MATCH_ID },
      data: queryData(),
    });

    writeSubscription(cache, {
      votingSessionUpdated: session({
        status: VoteSessionStatus.Completed,
        closedReason: VoteClosureReason.Unanimous,
        voteResult: {
          __typename: "VoteResult",
          top: player("user-2", "Sofiane"),
          flop: player("user-1", "Camille"),
        },
      }),
    });

    const result = cache.readQuery<VoteMatchQuery>({
      query: VoteMatchDocument,
      variables: { matchId: MATCH_ID },
    });

    expect(result?.getMatchById.votingSession?.status).toBe(
      VoteSessionStatus.Completed
    );
    expect(
      result?.getMatchById.votingSession?.voteResult?.top.displayName
    ).toBe("Sofiane");
  });
});

describe("closureLabel", () => {
  it("says why the vote closed, in words", () => {
    expect(closureLabel(VoteClosureReason.Unanimous)).toBe(
      "Tout le monde a voté !"
    );
    expect(closureLabel(VoteClosureReason.Deadline)).toBe("Temps écoulé");
    expect(closureLabel(VoteClosureReason.Admin)).toBe(
      "Clos par l’organisateur"
    );
    expect(closureLabel(null)).toBeNull();
  });
});
