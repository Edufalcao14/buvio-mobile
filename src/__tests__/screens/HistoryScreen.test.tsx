import React from "react";
import { ActivityIndicator } from "react-native";
import { MockedResponse } from "@apollo/client/testing";
import { render, screen, fireEvent, waitFor } from "@/test-utils/render";
import HistoryScreen from "@/features/match/screens/HistoryScreen";
import {
  MatchType,
  TeamHistoryDocument,
  VoteSessionStatus,
} from "@/graphql/generated/hooks";
import { HISTORY_PAGE_SIZE } from "@/features/match/hooks/useHistoryViewModel";

type MatchInput = {
  id: string;
  name: string;
  date: string;
  type?: MatchType;
  players?: number;
  votingSession?: {
    status: VoteSessionStatus;
    top?: string;
    flop?: string;
  } | null;
};

const player = (index: number) => ({
  __typename: "User",
  id: `player-${index}`,
  displayName: `Joueur ${index}`,
});

const buildMatch = ({
  id,
  name,
  date,
  type = MatchType.Amical,
  players = 2,
  votingSession = null,
}: MatchInput) => ({
  __typename: "Match",
  id,
  name,
  date,
  type,
  players: Array.from({ length: players }, (_, index) => player(index)),
  votingSession: votingSession
    ? {
        __typename: "VotingSession",
        id: `session-${id}`,
        status: votingSession.status,
        timeRemaining: 0,
        voteResult:
          votingSession.top && votingSession.flop
            ? {
                __typename: "VoteResult",
                top: {
                  __typename: "User",
                  id: "top",
                  displayName: votingSession.top,
                },
                flop: {
                  __typename: "User",
                  id: "flop",
                  displayName: votingSession.flop,
                },
              }
            : null,
      }
    : null,
});

const historyMock = (matches: MatchInput[]): MockedResponse => ({
  request: {
    query: TeamHistoryDocument,
    variables: { limit: HISTORY_PAGE_SIZE, offset: 0 },
  },
  result: {
    data: {
      me: {
        __typename: "Me",
        id: "me-1",
        team: {
          __typename: "Team",
          id: "team-1",
          name: "Les Invincibles",
          code: "AB12C",
          sport: "Football",
          matches: matches.map(buildMatch),
        },
      },
    },
  },
});

describe("HistoryScreen", () => {
  it("shows a spinner on the first load", () => {
    render(<HistoryScreen />, { mocks: [historyMock([])] });

    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("invites the team to play when the archive is empty", async () => {
    render(<HistoryScreen />, { mocks: [historyMock([])] });

    expect(
      await screen.findByText(
        "Rien dans les archives. Le premier match s’écrit tout seul ?"
      )
    ).toBeTruthy();
  });

  it("groups matches by month and counts matches and verdicts", async () => {
    render(<HistoryScreen />, {
      mocks: [
        historyMock([
          {
            id: "1",
            name: "Derby de janvier",
            date: "2026-01-12T20:00:00.000Z",
            votingSession: {
              status: VoteSessionStatus.Completed,
              top: "Camille",
              flop: "Sacha",
            },
          },
          {
            id: "2",
            name: "Match de décembre",
            date: "2025-12-03T20:00:00.000Z",
            type: MatchType.Tournoi,
          },
        ]),
      ],
    });

    expect(await screen.findByText("Derby de janvier")).toBeTruthy();
    expect(screen.getByText("Janvier 2026")).toBeTruthy();
    expect(screen.getByText("Décembre 2025")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy(); // matchs
    expect(screen.getByText("matchs")).toBeTruthy();
    expect(screen.getByText("verdict")).toBeTruthy(); // exactly one decided
    // Nothing is still open, so the strip does not claim otherwise.
    expect(screen.queryByText("vote ouvert")).toBeNull();
    expect(screen.queryByText("votes ouverts")).toBeNull();
  });

  it("counts the votes still open in the summary strip", async () => {
    render(<HistoryScreen />, {
      mocks: [
        historyMock([
          {
            id: "1",
            name: "Match en cours",
            date: "2020-01-12T20:00:00.000Z",
            votingSession: { status: VoteSessionStatus.InProgress },
          },
        ]),
      ],
    });

    expect(await screen.findByText("Match en cours")).toBeTruthy();
    expect(screen.getByText("vote ouvert")).toBeTruthy();
  });

  it.each([
    [
      "voting",
      { status: VoteSessionStatus.InProgress },
      "2020-01-12T20:00:00.000Z",
      "🔴 Vote en cours",
    ],
    [
      "notStarted (session not created, match already played)",
      null,
      "2020-01-12T20:00:00.000Z",
      "⚪ Vote pas lancé",
    ],
    [
      "noVotes (session closed with no result)",
      { status: VoteSessionStatus.Completed },
      "2020-01-12T20:00:00.000Z",
      "🕳️ Personne n’a voté",
    ],
    ["upcoming", null, "2999-01-12T20:00:00.000Z", "⏳ À venir"],
    [
      "result",
      {
        status: VoteSessionStatus.Completed,
        top: "Camille",
        flop: "Sacha",
      },
      "2020-01-12T20:00:00.000Z",
      "✅ Terminé",
    ],
  ] as const)(
    "tags the %s outcome",
    async (_kind, votingSession, date, expected) => {
      render(<HistoryScreen />, {
        mocks: [
          historyMock([
            {
              id: "1",
              name: "Match test",
              date,
              votingSession: votingSession as MatchInput["votingSession"],
            },
          ]),
        ],
      });

      expect(await screen.findByText(expected)).toBeTruthy();
    }
  );

  it("tags the match type on every card", async () => {
    render(<HistoryScreen />, {
      mocks: [
        historyMock([
          {
            id: "1",
            name: "Coupe",
            date: "2020-01-12T20:00:00.000Z",
            type: MatchType.Championnat,
          },
        ]),
      ],
    });

    expect(await screen.findByText("Championnat")).toBeTruthy();
  });

  it("crowns the top and roasts the flop once the verdict is in", async () => {
    render(<HistoryScreen />, {
      mocks: [
        historyMock([
          {
            id: "1",
            name: "Derby",
            date: "2020-01-12T20:00:00.000Z",
            votingSession: {
              status: VoteSessionStatus.Completed,
              top: "Camille",
              flop: "Sacha",
            },
          },
        ]),
      ],
    });

    expect(await screen.findByText("👑 Camille")).toBeTruthy();
    expect(screen.getByText("💩 Sacha")).toBeTruthy();
  });

  it("never shows a verdict tag before the vote is closed with a result", async () => {
    render(<HistoryScreen />, {
      mocks: [
        historyMock([
          {
            id: "1",
            name: "Match test",
            date: "2020-01-12T20:00:00.000Z",
            votingSession: { status: VoteSessionStatus.InProgress },
          },
        ]),
      ],
    });

    await screen.findByText("🔴 Vote en cours");

    expect(screen.queryByText(/^👑/)).toBeNull();
    expect(screen.queryByText(/^💩/)).toBeNull();
  });

  it("offers a retry when the history cannot be loaded", async () => {
    render(<HistoryScreen />, {
      mocks: [
        {
          request: {
            query: TeamHistoryDocument,
            variables: { limit: HISTORY_PAGE_SIZE, offset: 0 },
          },
          error: new Error("offline"),
        },
        historyMock([
          { id: "1", name: "Derby retrouvé", date: "2026-01-12T20:00:00.000Z" },
        ]),
      ],
    });

    expect(
      await screen.findByText("Impossible de charger l’historique.")
    ).toBeTruthy();
    expect(screen.getByLabelText("Le tableau du club est tombé…")).toBeTruthy();

    fireEvent.press(screen.getByRole("button", { name: "Réessayer" }));

    await waitFor(() =>
      expect(screen.getByText("Derby retrouvé")).toBeTruthy()
    );
  });
});

describe("HistoryScreen — opening a match", () => {
  it("opens the voting session of a finished match", async () => {
    const { router } = jest.requireMock("expo-router");

    render(<HistoryScreen />, {
      mocks: [
        historyMock([
          {
            id: "m-done",
            name: "Match clos",
            date: "2026-07-04T18:00:00.000Z",
            votingSession: {
              status: VoteSessionStatus.Completed,
              top: "Eduardo",
              flop: "Marie",
            },
          },
        ]),
      ],
    });

    fireEvent.press(await screen.findByText("Match clos"));

    expect(router.push).toHaveBeenCalledWith("/vote/m-done");
  });

  // Nothing to show before a vote exists, so the card must not act like a
  // button the player can press into an empty screen.
  it("leaves a match with no voting session unpressable", async () => {
    const { router } = jest.requireMock("expo-router");
    router.push.mockClear();

    render(<HistoryScreen />, {
      mocks: [
        historyMock([
          {
            id: "m-open",
            name: "Match sans vote",
            date: "2026-07-04T18:00:00.000Z",
          },
        ]),
      ],
    });

    fireEvent.press(await screen.findByText("Match sans vote"));

    expect(router.push).not.toHaveBeenCalled();
  });
});
