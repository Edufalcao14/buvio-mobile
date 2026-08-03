import React from "react";
import { render, screen } from "@/test-utils/render";
import { TallyRow } from "./TallyRow";

describe("TallyRow", () => {
  it("announces the running count for a player", () => {
    render(<TallyRow name="Sofiane Bel" topCount={3} flopCount={1} max={3} />);

    expect(screen.getByLabelText("Sofiane Bel : 3 top, 1 flop")).toBeTruthy();
  });
});
