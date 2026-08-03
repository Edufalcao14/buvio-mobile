import React from "react";
import { router } from "expo-router";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@/test-utils/render";
import SignInScreen from "@/features/auth/screens/SignInScreen";
import { useAuth } from "@/providers/AuthProvider";

jest.mock("@/providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

const signIn = jest.fn();
const mockedUseAuth = useAuth as unknown as jest.Mock;

const fillForm = (email = "user@example.com", password = "supersecret") => {
  fireEvent.changeText(screen.getByPlaceholderText("votre@email.com"), email);
  fireEvent.changeText(
    screen.getByPlaceholderText("6 caractères minimum"),
    password,
  );
};

describe("SignInScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuth.mockReturnValue({ signIn });
  });

  it("renders the hero, the fields and the call to action", () => {
    render(<SignInScreen />);

    expect(screen.getByText("Connexion")).toBeTruthy();
    expect(
      screen.getByText("Connectez-vous pour retrouver votre équipe"),
    ).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Mot de passe")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Se Connecter" })).toBeTruthy();
    expect(screen.getByText("Mot de passe oublié ?")).toBeTruthy();
    expect(screen.getByText("S’inscrire")).toBeTruthy();
  });

  it("blocks the submit and shows the field errors when the form is empty", async () => {
    render(<SignInScreen />);

    fireEvent.press(screen.getByRole("button", { name: "Se Connecter" }));

    expect(
      await screen.findByText("Veuillez entrer une adresse e-mail valide"),
    ).toBeTruthy();
    expect(
      screen.getByText("Le mot de passe doit comporter au moins 6 caractères"),
    ).toBeTruthy();
    expect(signIn).not.toHaveBeenCalled();
  });

  it("sends the user to the team tabs when they already have a team", async () => {
    signIn.mockResolvedValue({ id: "1", team: { id: "t1" } });
    render(<SignInScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "Se Connecter" }));

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("user@example.com", "supersecret"),
    );
    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("/(tabs)/team"),
    );
  });

  it("sends a teamless user to the welcome flow", async () => {
    signIn.mockResolvedValue({ id: "1", team: null });
    render(<SignInScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "Se Connecter" }));

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/welcome"));
  });

  it("shows the server error message when the credentials are refused", async () => {
    signIn.mockRejectedValue(new Error("Identifiants invalides"));
    render(<SignInScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "Se Connecter" }));

    expect(await screen.findByText("Identifiants invalides")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();
  });
});
