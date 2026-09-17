import React from "react";
import { render, screen } from "@/test-utils/render";
import { PlayerAvatar, initialsOf } from "@/components/avatars/PlayerAvatar";

// The avatar is decorative: it is hidden from the accessibility tree on
// purpose, so the queries have to look past that.
const hidden = { includeHiddenElements: true } as const;

describe("PlayerAvatar", () => {
  it("builds a monogram from the name it is given", () => {
    expect(initialsOf("Camille Dupont")).toBe("CD");
    expect(initialsOf("Cami")).toBe("C");
    expect(initialsOf("   ")).toBe("?");
  });

  it("shows the initials while a player has no avatar", () => {
    render(<PlayerAvatar name="Camille Dupont" url={null} />);

    expect(screen.getByText("CD", hidden)).toBeTruthy();
  });

  it("shows the picture once there is one", () => {
    render(<PlayerAvatar name="Camille Dupont" url="https://cdn.test/a.jpg" />);

    expect(screen.queryByText("CD", hidden)).toBeNull();
  });
});
