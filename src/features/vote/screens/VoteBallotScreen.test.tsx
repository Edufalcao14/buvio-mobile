import React from "react";
import { render, screen, fireEvent, act } from "@/test-utils/render";
import VoteBallotScreen from "./VoteBallotScreen";
import type {
  BallotOutcome,
  VotePlayer,
} from "@/features/vote/hooks/useVoteViewModel";

type SubmitMock = jest.Mock<Promise<BallotOutcome>>;

const ROSTER: VotePlayer[] = [
  {
    id: "user-2",
    displayName: "Sofiane Belkacem",
    nickname: "Sofiane Bel",
    avatarUrl: null,
  },
  {
    id: "user-3",
    displayName: "Inès Roy",
    nickname: "Inès Roy",
    avatarUrl: null,
  },
];

const eligibleForFlop = (topPlayerId: string | null) =>
  ROSTER.filter((player) => player.id !== topPlayerId);

const renderBallot = (
  onSubmit: SubmitMock = jest.fn(async () => ({ status: "success" as const }))
) => {
  render(
    <VoteBallotScreen
      eligibleForTop={ROSTER}
      eligibleForFlop={eligibleForFlop}
      isSubmitting={false}
      onSubmit={onSubmit}
    />
  );

  return onSubmit;
};

const press = async (name: string) => {
  fireEvent.press(screen.getByLabelText(name));
  await act(async () => {});
};

describe("VoteBallotScreen", () => {
  it("asks for the Top first and keeps the ballot from advancing empty", () => {
    renderBallot();

    expect(screen.getByText("Who was the Top?")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Continue" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Continue" }).props.accessibilityState
        .disabled
    ).toBe(true);
  });

  it("drops the chosen Top from the Flop list", async () => {
    renderBallot();

    await press("Sofiane Bel");
    await press("Continue");

    expect(screen.getByText("And the Flop?")).toBeTruthy();
    expect(screen.queryByLabelText("Sofiane Bel")).toBeNull();
    expect(screen.getByLabelText("Inès Roy")).toBeTruthy();
  });

  it("sends both votes from the confirmation step", async () => {
    const onSubmit = renderBallot();

    await press("Sofiane Bel");
    await press("Continue");
    await press("Inès Roy");
    await press("Continue");

    expect(screen.getByText("Send it?")).toBeTruthy();

    await press("Send my vote");

    expect(onSubmit).toHaveBeenCalledWith("user-2", "", "user-3", "");
  });

  it("says the Top was recorded when only the Flop fails", async () => {
    const onSubmit: SubmitMock = jest.fn(async () => ({
      status: "topOnly" as const,
      message: "Réessayez dans un instant.",
    }));
    renderBallot(onSubmit);

    await press("Sofiane Bel");
    await press("Continue");
    await press("Inès Roy");
    await press("Continue");
    await press("Send my vote");

    expect(
      screen.getByText(
        "Your Top was recorded, but the Flop didn't go through. Réessayez dans un instant."
      )
    ).toBeTruthy();
  });

  it("says so when there is nobody to vote for", () => {
    render(
      <VoteBallotScreen
        eligibleForTop={[]}
        eligibleForFlop={() => []}
        isSubmitting={false}
        onSubmit={jest.fn(async () => ({ status: "success" as const }))}
      />
    );

    expect(
      screen.getByText("The match sheet needs at least two players to vote.")
    ).toBeTruthy();
  });
});
