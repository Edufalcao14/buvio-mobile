import React from "react";
import { router } from "expo-router";
import { render, screen, fireEvent } from "@/test-utils/render";
import Welcome from "@/features/welcome/screens/Welcome";

describe("Welcome", () => {
  beforeEach(() => jest.clearAllMocks());

  it("greets the new player and offers the two ways in", () => {
    render(<Welcome />);

    expect(screen.getByText("Your team, your verdict.")).toBeTruthy();
    expect(
      screen.getByText("Join an existing team or create your own.")
    ).toBeTruthy();
    expect(screen.getByText("Create a team")).toBeTruthy();
    expect(screen.getByText("Join a team")).toBeTruthy();
  });

  it("opens the create-team screen", () => {
    render(<Welcome />);

    fireEvent.press(screen.getByText("Create a team"));

    expect(router.push).toHaveBeenCalledWith("/welcome/createTeam");
  });

  it("opens the join-team screen", () => {
    render(<Welcome />);

    fireEvent.press(screen.getByText("Join a team"));

    expect(router.push).toHaveBeenCalledWith("/welcome/joinTeam");
  });
});
