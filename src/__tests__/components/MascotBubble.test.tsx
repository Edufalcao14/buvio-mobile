import React from "react";
import { render, screen } from "@/test-utils/render";
import { MascotBubble } from "@/components/mascot/MascotBubble";

describe("MascotBubble", () => {
  it("shows the goat's line as text", () => {
    render(<MascotBubble line="La troisième mi-temps commence ici !" />);

    expect(
      screen.getByText("La troisième mi-temps commence ici !")
    ).toBeTruthy();
  });

  it("exposes the line as the accessible name of the sticker", () => {
    render(<MascotBubble line="The club's board fell down…" size="sm" />);

    expect(screen.getByLabelText("The club's board fell down…")).toBeTruthy();
  });
});
