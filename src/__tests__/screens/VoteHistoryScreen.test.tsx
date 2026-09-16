import React from "react";
import { ActivityIndicator } from "react-native";
import { MockedResponse } from "@apollo/client/testing";
import { render, screen } from "@/test-utils/render";
import VoteHistoryScreen from "@/features/vote/screens/VoteHistoryScreen";
import { MatchVoteHistoryDocument, VoteType } from "@/graphql/generated/hooks";

const MATCH_ID = "match-1";

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

type VoteInput = {
  id: string;
  type: VoteType;
  description: string | null;
  voter: ReturnType<typeof user>;
  voted: ReturnType<typeof user>;
  createdAt?: string;
};

const vote = ({
  id,
  type,
  description,
  voter,
  voted,
  createdAt = "2026-08-03T20:00:00.000Z",
}: VoteInput) => ({
  __typename: "Vote" as const,
  id,
  type,
  description,
  createdAt,
  voter,
  voted,
});

const historyMock = (
  votes: ReturnType<typeof vote>[] | null
): MockedResponse => ({
  request: {
    query: MatchVoteHistoryDocument,
    variables: { matchId: MATCH_ID },
  },
  result: {
    data: {
      getMatchById: {
        __typename: "Match",
        id: MATCH_ID,
        votingSession:
          votes === null
            ? null
            : {
                __typename: "VotingSession",
                id: "session-1",
                votes,
              },
      },
    },
  },
});

const CAMILLE = user("user-1", "Camille Dupont", "Cami");
const SOFIANE = user("user-2", "Sofiane Belkacem", "Sofiane");
const INES = user("user-3", "Inès Roy", null);

const renderHistory = (mocks: MockedResponse[]) =>
  render(<VoteHistoryScreen matchId={MATCH_ID} visible onClose={jest.fn()} />, {
    mocks,
  });

describe("VoteHistoryScreen", () => {
  it("spins while the ballots are still loading", () => {
    renderHistory([historyMock([])]);

    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("groups the ballots under the player they were cast for", async () => {
    renderHistory([
      historyMock([
        vote({
          id: "v1",
          type: VoteType.Top,
          description: "Doublé en seconde période.",
          voter: CAMILLE,
          voted: SOFIANE,
        }),
        vote({
          id: "v2",
          type: VoteType.Flop,
          description: "Trois passes, trois adversaires.",
          voter: SOFIANE,
          voted: INES,
        }),
      ]),
    ]);

    // One block per player who received votes.
    expect(
      await screen.findByLabelText("Votes pour Sofiane : 1 top, 0 flop")
    ).toBeTruthy();
    expect(
      screen.getByLabelText("Votes pour Inès : 0 top, 1 flop")
    ).toBeTruthy();

    // Each ballot: its comment, its voter, and which way it went.
    expect(screen.getByText("Doublé en seconde période.")).toBeTruthy();
    expect(screen.getByText("Trois passes, trois adversaires.")).toBeTruthy();
    expect(screen.getByText("Cami")).toBeTruthy();
    expect(screen.getByText("Top pour Sofiane")).toBeTruthy();
    expect(screen.getByText("Flop pour Inès")).toBeTruthy();
    expect(
      screen.getByLabelText(
        "Cami a donné un Top à Sofiane. Doublé en seconde période."
      )
    ).toBeTruthy();
  });

  // A silent vote is deliberate, not a rendering hole.
  it("says so when a vote carries no comment", async () => {
    renderHistory([
      historyMock([
        vote({
          id: "v1",
          type: VoteType.Top,
          description: "Le patron du milieu.",
          voter: CAMILLE,
          voted: SOFIANE,
        }),
        vote({
          id: "v2",
          type: VoteType.Top,
          description: null,
          voter: INES,
          voted: SOFIANE,
        }),
      ]),
    ]);

    expect(await screen.findByText("Le patron du milieu.")).toBeTruthy();
    expect(screen.getByText("Sans commentaire")).toBeTruthy();
  });

  // A comment that is only whitespace is no comment at all.
  it("treats a blank comment as no comment", async () => {
    renderHistory([
      historyMock([
        vote({
          id: "v1",
          type: VoteType.Flop,
          description: "   ",
          voter: CAMILLE,
          voted: INES,
        }),
      ]),
    ]);

    expect(await screen.findByText("Sans commentaire")).toBeTruthy();
  });

  it("counts the tops and the flops each player collected", async () => {
    renderHistory([
      historyMock([
        vote({
          id: "v1",
          type: VoteType.Top,
          description: null,
          voter: CAMILLE,
          voted: SOFIANE,
        }),
        vote({
          id: "v2",
          type: VoteType.Top,
          description: null,
          voter: INES,
          voted: SOFIANE,
        }),
        vote({
          id: "v3",
          type: VoteType.Flop,
          description: null,
          voter: CAMILLE,
          voted: INES,
        }),
      ]),
    ]);

    expect(
      await screen.findByLabelText("Votes pour Sofiane : 2 top, 0 flop")
    ).toBeTruthy();
    expect(
      screen.getByLabelText("Votes pour Inès : 0 top, 1 flop")
    ).toBeTruthy();
    expect(screen.getByText("3 votes, commentaires compris.")).toBeTruthy();
  });

  // A closed session nobody voted on.
  it("owns the empty case instead of showing a blank list", async () => {
    renderHistory([historyMock([])]);

    expect(
      await screen.findByText(
        "Personne n’a voté sur ce match : il n’y a rien à raconter."
      )
    ).toBeTruthy();
  });

  it("fetches nothing until the list is actually opened", () => {
    render(
      <VoteHistoryScreen
        matchId={MATCH_ID}
        visible={false}
        onClose={jest.fn()}
      />,
      // No mock at all: opening the query here would blow the test up.
      { mocks: [] }
    );

    expect(screen.queryByText("Tous les votes")).toBeNull();
  });
});
