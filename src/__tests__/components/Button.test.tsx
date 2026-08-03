import React from "react";
import { render, screen, fireEvent } from "@/test-utils/render";
import { Button } from "@/components/buttons/button";

describe("Button", () => {
  it("renders its label and is reachable as a button", () => {
    render(<Button text="Se Connecter" onPress={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Se Connecter" })).toBeTruthy();
    expect(screen.getByText("Se Connecter")).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const onPress = jest.fn();
    render(<Button text="Réessayer" onPress={onPress} />);

    fireEvent.press(screen.getByRole("button", { name: "Réessayer" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("swaps the label for a spinner and stops responding while loading", () => {
    const onPress = jest.fn();
    render(<Button text="Créer l'équipe" onPress={onPress} isLoading />);

    expect(screen.queryByText("Créer l'équipe")).toBeNull();
    fireEvent.press(screen.getByRole("button", { name: "Créer l'équipe" }));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("does not fire when disabled", () => {
    const onPress = jest.fn();
    render(<Button text="Rejoindre l’équipe" onPress={onPress} disabled />);

    const button = screen.getByRole("button", { name: "Rejoindre l’équipe" });
    fireEvent.press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
