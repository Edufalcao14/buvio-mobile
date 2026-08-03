import React from "react";
import { router } from "expo-router";
import { render, screen, fireEvent } from "@/test-utils/render";
import Welcome from "@/features/welcome/screens/Welcome";

describe("Welcome", () => {
  beforeEach(() => jest.clearAllMocks());

  it("greets the new player and offers the two ways in", () => {
    render(<Welcome />);

    expect(screen.getByText("Bienvenue sur Buvio !")).toBeTruthy();
    expect(
      screen.getByLabelText("La troisième mi-temps commence ici !"),
    ).toBeTruthy();
    expect(screen.getByText("Créer une équipe")).toBeTruthy();
    expect(screen.getByText("Rejoindre une équipe")).toBeTruthy();
  });

  it("opens the create-team screen", () => {
    render(<Welcome />);

    fireEvent.press(screen.getByText("Créer une équipe"));

    expect(router.push).toHaveBeenCalledWith("/welcome/createTeam");
  });

  it("opens the join-team screen", () => {
    render(<Welcome />);

    fireEvent.press(screen.getByText("Rejoindre une équipe"));

    expect(router.push).toHaveBeenCalledWith("/welcome/joinTeam");
  });
});
