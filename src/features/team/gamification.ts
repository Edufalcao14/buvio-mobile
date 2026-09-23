import type { MatchOutcome } from "@/features/match/hooks/useHistoryViewModel";

/**
 * The trophy tiers, Nike-Run-Club style: the first one is reachable on night
 * one, the last stays visible as the season goal. Thresholds are Top counts.
 */
export type TrophyTier = "bronze" | "argent" | "or";

export const TIER_THRESHOLDS: Record<TrophyTier, number> = {
  bronze: 1,
  argent: 3,
  or: 5,
};

export const TIER_LABELS: Record<TrophyTier, string> = {
  bronze: "Bronze",
  argent: "Argent",
  or: "Or",
};

export const tierOf = (topCount: number): TrophyTier | null => {
  if (topCount >= TIER_THRESHOLDS.or) return "or";
  if (topCount >= TIER_THRESHOLDS.argent) return "argent";
  if (topCount >= TIER_THRESHOLDS.bronze) return "bronze";
  return null;
};

/** Tops still needed for the next tier; null once at Or. */
export const nextTierGap = (topCount: number): number | null => {
  if (topCount >= TIER_THRESHOLDS.or) return null;
  if (topCount >= TIER_THRESHOLDS.argent) return TIER_THRESHOLDS.or - topCount;
  if (topCount >= TIER_THRESHOLDS.bronze)
    return TIER_THRESHOLDS.argent - topCount;
  return TIER_THRESHOLDS.bronze - topCount;
};

export type Streak = { name: string; count: number };

/**
 * "On fire": the same player crowned Top on the most recent decided matches,
 * newest first. Matches without a verdict yet (upcoming, voting) do not break
 * the run — they are not decided against anyone. A single win is not a
 * streak, so anything under two returns null.
 */
export const deriveStreak = (outcomes: MatchOutcome[]): Streak | null => {
  let name: string | null = null;
  let count = 0;

  for (const outcome of outcomes) {
    if (outcome.kind !== "result") {
      if (outcome.kind === "noVotes") break; // a decided night with no winner ends the run
      continue;
    }

    if (name === null) {
      name = outcome.topName;
      count = 1;
      continue;
    }

    if (outcome.topName !== name) break;
    count += 1;
  }

  return name !== null && count >= 2 ? { name, count } : null;
};
