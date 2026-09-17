import React from "react";
import { render, screen } from "@/test-utils/render";
import { TeamCrest } from "@/components/navigation/header/TeamCrest";

// The crest is decorative: it is hidden from the accessibility tree on
// purpose, so the queries have to look past that.
const hidden = { includeHiddenElements: true } as const;

describe("TeamCrest", () => {
  it("builds a monogram from the first two words", () => {
    render(<TeamCrest name="Les Invincibles" />);

    expect(screen.getByText("LI", hidden)).toBeTruthy();
  });

  it("skips lowercase filler words", () => {
    render(<TeamCrest name="Racing de Bruxelles" />);

    expect(screen.getByText("RB", hidden)).toBeTruthy();
  });

  it("uses a single initial for a one-word club", () => {
    render(<TeamCrest name="Anderlecht" />);

    expect(screen.getByText("A", hidden)).toBeTruthy();
  });

  it("falls back to the Buvio B when the name carries no letters", () => {
    render(<TeamCrest name="   " />);

    expect(screen.getByText("B", hidden)).toBeTruthy();
  });

  it("wears an uploaded crest instead of the monogram", () => {
    render(
      <TeamCrest name="Les Invincibles" url="https://cdn.test/crest.jpg" />
    );

    expect(screen.queryByText("LI", hidden)).toBeNull();
  });

  it("keeps the monogram when there is no crest to show", () => {
    render(<TeamCrest name="Les Invincibles" url={null} />);

    expect(screen.getByText("LI", hidden)).toBeTruthy();
  });
});
