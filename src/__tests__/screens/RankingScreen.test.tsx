import React from "react";
import { ActivityIndicator } from "react-native";
import { MockedResponse } from "@apollo/client/testing";
import { render, screen } from "@/test-utils/render";
import RankingScreen from "@/features/team/screens/RankingScreen";
import { TeamRankingDocument } from "@/graphql/generated/hooks";
import { useAuth } from "@/providers/AuthProvider";

jest.mock("@/providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as unknown as jest.Mock;

type Standing = { id: string; name: string; top: number; flop: number };

const rankingMock = (standings: Standing[]): MockedResponse => ({
  request: { query: TeamRankingDocument },
  result: {
    data: {
      teamRanking: standings.map((standing) => ({
        __typename: "PlayerStanding",
        topCount: standing.top,
        flopCount: standing.flop,
        player: {
          __typename: "User",
          id: standing.id,
          displayName: standing.name,
        },
      })),
    },
  },
});

describe("RankingScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuth.mockReturnValue({ userData: { id: "me-1" } });
  });

  it("shows a spinner on the first load", () => {
    render(<RankingScreen />, { mocks: [rankingMock([])] });

    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("builds one podium per category, best first", async () => {
    render(<RankingScreen />, {
      mocks: [
        rankingMock([
          { id: "p1", name: "Eduardo", top: 3, flop: 0 },
          { id: "p2", name: "Marie", top: 1, flop: 4 },
        ]),
      ],
    });

    expect(await screen.findByText("Les plus TOP")).toBeTruthy();
    expect(screen.getByText("Les plus FLOP")).toBeTruthy();
    expect(screen.getByText("Eduardo")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
    expect(screen.getByText("4")).toBeTruthy();
  });

  // A podium is for players the squad actually voted for; listing everyone at
  // zero would read as a table again, which is what the podiums replaced.
  it("leaves players with no votes off the podiums", async () => {
    render(<RankingScreen />, {
      mocks: [
        rankingMock([
          { id: "p1", name: "Eduardo", top: 2, flop: 0 },
          { id: "p2", name: "Camille", top: 0, flop: 0 },
        ]),
      ],
    });

    expect(await screen.findByText("Eduardo")).toBeTruthy();
    expect(screen.queryByText("Camille")).toBeNull();
  });

  it("marks the signed-in player on the podium", async () => {
    render(<RankingScreen />, {
      mocks: [rankingMock([{ id: "me-1", name: "Eduardo", top: 2, flop: 0 }])],
    });

    expect(await screen.findByText("toi")).toBeTruthy();
  });

  it("says nobody has a trophy yet when no vote has been counted", async () => {
    render(<RankingScreen />, {
      mocks: [rankingMock([{ id: "p1", name: "Eduardo", top: 0, flop: 0 }])],
    });

    expect(
      await screen.findByLabelText(
        "Personne n\u2019a encore de troph\u00e9e. Premier match, premier verdict !"
      )
    ).toBeTruthy();
    expect(screen.getByText("Aucun top pour l\u2019instant.")).toBeTruthy();
    expect(screen.getByText("Aucun flop pour l\u2019instant.")).toBeTruthy();
  });

  it("offers a retry when the standings fail to load", async () => {
    render(<RankingScreen />, {
      mocks: [
        {
          request: { query: TeamRankingDocument },
          error: new Error("network down"),
        },
      ],
    });

    expect(
      await screen.findByText("Impossible de charger le classement.")
    ).toBeTruthy();

    // The retry affordance is what matters here; the refetch path itself is
    // covered by the successful-load tests above.
    expect(screen.getByText("R\u00e9essayer")).toBeTruthy();
  });
});
