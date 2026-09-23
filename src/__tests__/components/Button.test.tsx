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
    render(<Button text="Try again" onPress={onPress} />);

    fireEvent.press(screen.getByRole("button", { name: "Try again" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("swaps the label for a spinner and stops responding while loading", () => {
    const onPress = jest.fn();
    render(<Button text="Create the team" onPress={onPress} isLoading />);

    expect(screen.queryByText("Create the team")).toBeNull();
    fireEvent.press(screen.getByRole("button", { name: "Create the team" }));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("does not fire when disabled", () => {
    const onPress = jest.fn();
    render(<Button text="Join the team" onPress={onPress} disabled />);

    const button = screen.getByRole("button", { name: "Join the team" });
    fireEvent.press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
