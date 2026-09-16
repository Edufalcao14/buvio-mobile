import React from "react";
import { MockedResponse } from "@apollo/client/testing";
import { render, screen, fireEvent, act } from "@/test-utils/render";
import VoteScreen from "@/features/vote/screens/VoteScreen";
import {
  MatchType,
  MatchVoteHistoryDocument,
  VoteClosureReason,
  VoteMatchDocument,
  VoteSessionStatus,
  VoteType,
  VotingSessionUpdatedDocument,
} from "@/graphql/generated/hooks";

const MATCH_ID = "match-1";
const SESSION_ID = "session-1";

const user = (
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

const ME = user("user-1", "Camille Dupont", "Cami");
const SOFIANE = user("user-2", "Sofiane Belkacem", "Sofiane");

const session = (status: VoteSessionStatus) => ({
  __typename: "VotingSession" as const,
  id: SESSION_ID,
  status,
  timeRemaining: status === VoteSessionStatus.InProgress ? 600 : 0,
  closingAt: "2026-08-03T21:00:00.000Z",
  closedAt:
    status === VoteSessionStatus.Completed ? "2026-08-03T21:00:00.000Z" : null,
  closedReason:
    status === VoteSessionStatus.Completed ? VoteClosureReason.Unanimous : null,
  startedBy: user("user-1", "Camille Dupont", "Cami"),
  match: {
    __typename: "Match" as const,
    id: MATCH_ID,
    name: "Match du dimanche",
    date: "2026-08-03T18:00:00.000Z",
  },
  ballots: [
    {
      __typename: "BallotProgress" as const,
      player: ME,
      hasTop: true,
      hasFlop: true,
      isComplete: true,
    },
  ],
  tally: [
    {
      __typename: "TallyEntry" as const,
      player: SOFIANE,
      topCount: 1,
      flopCount: 0,
    },
  ],
  voteResult:
    status === VoteSessionStatus.Completed
      ? {
          __typename: "VoteResult" as const,
          top: SOFIANE,
          flop: user("user-3", "Inès Roy", null),
        }
      : null,
});

const voteMatchMock = (status: VoteSessionStatus | null): MockedResponse => ({
  request: { query: VoteMatchDocument, variables: { matchId: MATCH_ID } },
  result: {
    data: {
      me: { ...ME, __typename: "Me" as const },
      getMatchById: {
        __typename: "Match",
        id: MATCH_ID,
        name: "Match du dimanche",
        date: "2026-08-03T18:00:00.000Z",
        type: MatchType.Amical,
        players: [ME, SOFIANE, user("user-3", "Inès Roy", null)],
        votingSession: status === null ? null : session(status),
      },
    },
  },
});

/*
 * The screen opens a live subscription as soon as it has a session id. It is
 * mocked so the socket never resolves: these tests are about the closed
 * session, and a push would only replay the state they already assert on.
 */
const silentSubscription = (): MockedResponse => ({
  request: {
    query: VotingSessionUpdatedDocument,
    variables: { votingSessionId: SESSION_ID },
  },
  result: {
    data: { votingSessionUpdated: session(VoteSessionStatus.Completed) },
  },
  delay: Infinity,
});

const historyMock = (): MockedResponse => ({
  request: {
    query: MatchVoteHistoryDocument,
    variables: { matchId: MATCH_ID },
  },
  result: {
    data: {
      getMatchById: {
        __typename: "Match",
        id: MATCH_ID,
        votingSession: {
          __typename: "VotingSession",
          id: SESSION_ID,
          votes: [
            {
              __typename: "Vote",
              id: "v1",
              type: VoteType.Top,
              description: "Il a tout gagné dans les duels.",
              createdAt: "2026-08-03T20:00:00.000Z",
              voter: ME,
              voted: SOFIANE,
            },
          ],
        },
      },
    },
  },
});

const renderVote = (mocks: MockedResponse[]) =>
  render(<VoteScreen matchId={MATCH_ID} onClose={jest.fn()} />, { mocks });

const ACTION = "Voir tous les votes";

describe("the ballot history action on the result", () => {
  it("offers the full ballot list once the session is closed", async () => {
    renderVote([
      voteMatchMock(VoteSessionStatus.Completed),
      silentSubscription(),
    ]);

    expect(await screen.findByText("Top de la soirée")).toBeTruthy();
    expect(screen.getByRole("button", { name: ACTION })).toBeTruthy();
  });

  it("does not offer it while the vote is still running", async () => {
    renderVote([
      voteMatchMock(VoteSessionStatus.InProgress),
      silentSubscription(),
    ]);

    expect(await screen.findByText("Vote en cours")).toBeTruthy();
    expect(screen.queryByText(ACTION)).toBeNull();
  });

  it("does not offer it when no vote was ever opened", async () => {
    renderVote([voteMatchMock(null)]);

    expect(await screen.findByText("Ouvrir le vote")).toBeTruthy();
    expect(screen.queryByText(ACTION)).toBeNull();
  });

  it("opens the ballots, comments included, when the action is pressed", async () => {
    renderVote([
      voteMatchMock(VoteSessionStatus.Completed),
      silentSubscription(),
      historyMock(),
    ]);

    fireEvent.press(await screen.findByRole("button", { name: ACTION }));
    await act(async () => {});

    expect(screen.getByText("Tous les votes")).toBeTruthy();
    expect(
      await screen.findByText("Il a tout gagné dans les duels.")
    ).toBeTruthy();
  });
});
