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
  { id: "user-3", displayName: "Inès Roy", nickname: "Inès Roy", avatarUrl: null },
];

const eligibleForFlop = (topPlayerId: string | null) =>
  ROSTER.filter((player) => player.id !== topPlayerId);

const renderBallot = (
  onSubmit: SubmitMock = jest.fn(async () => ({ status: "success" as const })),
) => {
  render(
    <VoteBallotScreen
      eligibleForTop={ROSTER}
      eligibleForFlop={eligibleForFlop}
      isSubmitting={false}
      onSubmit={onSubmit}
    />,
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

    expect(screen.getByText("Qui a été le TOP ? 👑")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Continuer" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Continuer" }).props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it("drops the chosen Top from the Flop list", async () => {
    renderBallot();

    await press("Sofiane Bel");
    await press("Continuer");

    expect(screen.getByText("Et le FLOP ? 💩")).toBeTruthy();
    expect(screen.queryByLabelText("Sofiane Bel")).toBeNull();
    expect(screen.getByLabelText("Inès Roy")).toBeTruthy();
  });

  it("sends both votes from the confirmation step", async () => {
    const onSubmit = renderBallot();

    await press("Sofiane Bel");
    await press("Continuer");
    await press("Inès Roy");
    await press("Continuer");

    expect(screen.getByText("On envoie ?")).toBeTruthy();

    await press("Envoyer mon vote");

    expect(onSubmit).toHaveBeenCalledWith("user-2", "", "user-3", "");
  });

  it("says the Top was recorded when only the Flop fails", async () => {
    const onSubmit: SubmitMock = jest.fn(async () => ({
      status: "topOnly" as const,
      message: "Réessayez dans un instant.",
    }));
    renderBallot(onSubmit);

    await press("Sofiane Bel");
    await press("Continuer");
    await press("Inès Roy");
    await press("Continuer");
    await press("Envoyer mon vote");

    expect(
      screen.getByText(
        "Ton Top a bien été enregistré, mais le Flop n’est pas passé. Réessayez dans un instant.",
      ),
    ).toBeTruthy();
  });

  it("says so when there is nobody to vote for", () => {
    render(
      <VoteBallotScreen
        eligibleForTop={[]}
        eligibleForFlop={() => []}
        isSubmitting={false}
        onSubmit={jest.fn(async () => ({ status: "success" as const }))}
      />,
    );

    expect(
      screen.getByText(
        "Il faut au moins deux joueurs sur la feuille de match pour voter.",
      ),
    ).toBeTruthy();
  });
});
