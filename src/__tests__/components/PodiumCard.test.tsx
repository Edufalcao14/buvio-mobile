import React from "react";
import { render, screen } from "@/test-utils/render";
import { PodiumCard } from "@/features/team/components/podium/PodiumCard";
import { PodiumEntry } from "@/features/team/hooks/useRankingViewModel";

const entry = (over: Partial<PodiumEntry> = {}): PodiumEntry => ({
  id: "player-1",
  rank: 1,
  nickname: "Eduardo",
  avatarUrl: null,
  count: 3,
  isCurrentUser: false,
  ...over,
});

describe("PodiumCard", () => {
  it("lists the players with their counts", () => {
    render(
      <PodiumCard
        title="Les plus TOP"
        emoji="👑"
        variant="top"
        entries={[entry(), entry({ id: "p2", rank: 2, nickname: "Marie", count: 1 })]}
        emptyLine="Aucun top pour l’instant."
      />,
    );

    expect(screen.getByText("Les plus TOP")).toBeTruthy();
    expect(screen.getByText("Eduardo")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
    expect(screen.getByText("Marie")).toBeTruthy();
  });

  it("marks the current user's row", () => {
    render(
      <PodiumCard
        title="Les plus TOP"
        emoji="👑"
        variant="top"
        entries={[entry({ isCurrentUser: true })]}
        emptyLine="Aucun top pour l’instant."
      />,
    );

    expect(screen.getByText("toi")).toBeTruthy();
  });

  // An empty podium says so rather than rendering an inviting blank card.
  it("explains an empty podium instead of showing nothing", () => {
    render(
      <PodiumCard
        title="Les plus FLOP"
        emoji="💩"
        variant="flop"
        entries={[]}
        emptyLine="Aucun flop pour l’instant."
      />,
    );

    expect(screen.getByText("Aucun flop pour l’instant.")).toBeTruthy();
  });
});
