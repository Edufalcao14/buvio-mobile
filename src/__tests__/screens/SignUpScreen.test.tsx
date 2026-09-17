import React from "react";
import { router } from "expo-router";
import { render, screen, fireEvent, waitFor } from "@/test-utils/render";
import SignUpScreen from "@/features/auth/screens/SignUpScreen";
import { useAuth } from "@/providers/AuthProvider";

jest.mock("@/providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

const signUp = jest.fn();
const mockedUseAuth = useAuth as unknown as jest.Mock;

const fillForm = (password = "Supersecret1!") => {
  const passwordFields = screen.getAllByPlaceholderText("6 caractères minimum");

  fireEvent.changeText(
    screen.getByPlaceholderText("Prénom et Nom"),
    "Camille Dupont"
  );
  fireEvent.changeText(
    screen.getByPlaceholderText("votre@email.com"),
    "camille@example.com"
  );
  fireEvent.changeText(passwordFields[0], password);
  fireEvent.changeText(passwordFields[1], password);
};

describe("SignUpScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuth.mockReturnValue({ signUp });
  });

  it("renders the fields, the optional identity block and the call to action", () => {
    render(<SignUpScreen />);

    expect(screen.getByText("Inscription")).toBeTruthy();
    expect(screen.getByText("Nom Complet")).toBeTruthy();
    expect(screen.getByText("Surnom")).toBeTruthy();
    expect(screen.getByLabelText("Choisir une photo de profil")).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Mot de passe")).toBeTruthy();
    expect(screen.getByText("Confirmer Mot de passe")).toBeTruthy();
    expect(screen.getByRole("button", { name: "S'inscrire" })).toBeTruthy();
    expect(screen.getByText("Se Connecter")).toBeTruthy();
  });

  it("refuses an empty form and names every problem", async () => {
    render(<SignUpScreen />);

    fireEvent.press(screen.getByRole("button", { name: "S'inscrire" }));

    expect(
      await screen.findByText(
        "Le champs Nom Complet doit comporter au moins 3 caractères"
      )
    ).toBeTruthy();
    expect(
      screen.getByText("Veuillez entrer une adresse e-mail valide")
    ).toBeTruthy();
    expect(
      screen.getAllByText(
        "Le mot de passe doit comporter au moins 12 caractères"
      ).length
    ).toBe(2);
    expect(signUp).not.toHaveBeenCalled();
  });

  it("refuses a password that does not meet the backend policy", async () => {
    render(<SignUpScreen />);

    fillForm("douzecaracteres");
    fireEvent.press(screen.getByRole("button", { name: "S'inscrire" }));

    expect(
      await screen.findAllByText(
        "Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial"
      )
    ).toHaveLength(2);
    expect(signUp).not.toHaveBeenCalled();
  });

  it("creates the account and moves on to the welcome flow", async () => {
    signUp.mockResolvedValue(undefined);
    render(<SignUpScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "S'inscrire" }));

    await waitFor(() =>
      expect(signUp).toHaveBeenCalledWith(
        "camille@example.com",
        "Supersecret1!",
        "Camille Dupont",
        ""
      )
    );
    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/welcome"));
  });

  it("passes the surname along when the player gives one", async () => {
    signUp.mockResolvedValue(undefined);
    render(<SignUpScreen />);

    fillForm();
    fireEvent.changeText(
      screen.getByPlaceholderText("Optionnel — le nom que l’équipe utilise"),
      "Cami"
    );
    fireEvent.press(screen.getByRole("button", { name: "S'inscrire" }));

    await waitFor(() =>
      expect(signUp).toHaveBeenCalledWith(
        "camille@example.com",
        "Supersecret1!",
        "Camille Dupont",
        "Cami"
      )
    );
  });

  it("surfaces the server error instead of navigating", async () => {
    // The backend answers with a code, never with prose: the screen is
    // expected to turn that code into French copy.
    signUp.mockRejectedValue({
      graphQLErrors: [
        {
          message: "USER_EMAIL_ALREADY_EXISTS",
          extensions: { errorCode: "USER_EMAIL_ALREADY_EXISTS" },
        },
      ],
    });
    render(<SignUpScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "S'inscrire" }));

    expect(
      await screen.findByText(
        "Un compte existe déjà avec cette adresse e-mail."
      )
    ).toBeTruthy();
    expect(router.push).not.toHaveBeenCalled();
  });
});
