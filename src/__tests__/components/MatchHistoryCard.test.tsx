import React from "react";
import {
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { render, screen, fireEvent } from "@/test-utils/render";
import { MatchHistoryCard } from "@/features/match/components/matchHistoryCard/MatchHistoryCard";
import { Tag } from "@/features/match/components/matchHistoryCard/Tag";
import { theme } from "@/theme";
import type {
  HistoryMatch,
  MatchTag,
} from "@/features/match/hooks/useHistoryViewModel";

const makeMatch = (overrides: Partial<HistoryMatch> = {}): HistoryMatch => ({
  id: "match-1",
  name: "Match du dimanche",
  dayLabel: "12",
  monthLabel: "janv",
  playerCount: 8,
  outcome: { kind: "voting" },
  tags: [
    { id: "type", label: "Friendly", variant: "neutral" },
    { id: "status", label: "🔴 Vote open", variant: "live" },
  ],
  ...overrides,
});

const flatten = (style: unknown) =>
  (StyleSheet.flatten(style as StyleProp<ViewStyle & TextStyle>) ??
    {}) as ViewStyle & TextStyle;

/**
 * The flattened style of the pill wrapping a tag label — climbs past the
 * composite wrappers RNTL keeps in the tree until it hits the filled View.
 */
const tagStyleOf = (label: string) => {
  let node = screen.getByText(label).parent;

  while (node) {
    const style = flatten(node.props.style);
    if (style.backgroundColor) {
      return style;
    }
    node = node.parent;
  }

  throw new Error(`No filled pill found around "${label}"`);
};

describe("MatchHistoryCard", () => {
  it("shows the date, the name and the squad size", () => {
    render(<MatchHistoryCard match={makeMatch()} />);

    expect(screen.getByText("12")).toBeTruthy();
    expect(screen.getByText("janv")).toBeTruthy();
    expect(screen.getByText("Match du dimanche")).toBeTruthy();
    expect(screen.getByText("8 players")).toBeTruthy();
  });

  it("uses the singular for a lone player", () => {
    render(<MatchHistoryCard match={makeMatch({ playerCount: 1 })} />);

    expect(screen.getByText("1 player")).toBeTruthy();
  });

  it("renders every tag it is given, in order", () => {
    const tags: MatchTag[] = [
      { id: "type", label: "Tournament", variant: "neutral" },
      { id: "status", label: "✅ Finished", variant: "neutral" },
      { id: "top", label: "👑 Camille", variant: "honours" },
      { id: "flop", label: "💩 Sacha", variant: "neutral" },
    ];

    render(<MatchHistoryCard match={makeMatch({ tags })} />);

    tags.forEach((tag) => expect(screen.getByText(tag.label)).toBeTruthy());
  });

  it("stays a plain card with no press affordance by default", () => {
    render(<MatchHistoryCard match={makeMatch()} />);

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("becomes a button when a destination is given", () => {
    const onPress = jest.fn();
    render(<MatchHistoryCard match={makeMatch()} onPress={onPress} />);

    fireEvent.press(screen.getByRole("button", { name: "Match du dimanche" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe("Tag", () => {
  it("keeps gold for the honours tag only", () => {
    render(
      <>
        <Tag label="👑 Camille" variant="honours" />
        <Tag label="🔴 Vote open" variant="live" />
        <Tag label="Friendly" variant="neutral" />
        <Tag label="💩 Sacha" />
      </>
    );

    expect(tagStyleOf("👑 Camille").backgroundColor).toBe(
      theme.colors.secondary.main
    );
    expect(tagStyleOf("🔴 Vote open").backgroundColor).toBe(
      theme.colors.success.light
    );
    expect(tagStyleOf("Friendly").backgroundColor).toBe(theme.colors.grey[100]);
    // No variant means neutral — gold is never the fallback.
    expect(tagStyleOf("💩 Sacha").backgroundColor).toBe(theme.colors.grey[100]);
  });

  it("never pairs a fontWeight with the display face", () => {
    render(<Tag label="Friendly" />);

    const label = flatten(screen.getByText("Friendly").props.style);

    expect(label.fontFamily).toBe(theme.typography.fontFamily.displayBold);
    expect(label.fontWeight).toBeUndefined();
  });
});
