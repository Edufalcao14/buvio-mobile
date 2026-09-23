import { deriveStreak, nextTierGap, tierOf } from "./gamification";
import type { MatchOutcome } from "@/features/match/hooks/useHistoryViewModel";

const result = (topName: string): MatchOutcome => ({
  kind: "result",
  topName,
  flopName: "x",
});

describe("gamification", () => {
  it("tiers follow the thresholds and stop at Gold", () => {
    expect(tierOf(0)).toBeNull();
    expect(tierOf(1)).toBe("bronze");
    expect(tierOf(2)).toBe("bronze");
    expect(tierOf(3)).toBe("argent");
    expect(tierOf(5)).toBe("or");
    expect(tierOf(12)).toBe("or");
    expect(nextTierGap(0)).toBe(1);
    expect(nextTierGap(2)).toBe(1);
    expect(nextTierGap(4)).toBe(1);
    expect(nextTierGap(5)).toBeNull();
  });

  it("counts a run of the same Top, newest first, skipping undecided nights", () => {
    expect(
      deriveStreak([
        { kind: "voting" },
        result("Camille"),
        { kind: "upcoming" },
        result("Camille"),
        result("Hugo"),
      ])
    ).toEqual({ name: "Camille", count: 2 });
  });

  it("is null for a single win, an empty history, or a run broken by a no-vote night", () => {
    expect(deriveStreak([result("Camille"), result("Hugo")])).toBeNull();
    expect(deriveStreak([])).toBeNull();
    expect(
      deriveStreak([result("Camille"), { kind: "noVotes" }, result("Camille")])
    ).toBeNull();
  });
});
