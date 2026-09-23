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
  const passwordFields = screen.getAllByPlaceholderText("6 characters minimum");

  fireEvent.changeText(
    screen.getByPlaceholderText("First and last name"),
    "Camille Dupont"
  );
  fireEvent.changeText(
    screen.getByPlaceholderText("you@email.com"),
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

    expect(screen.getByRole("header", { name: "Sign up" })).toBeTruthy();
    expect(screen.getByText("Full name")).toBeTruthy();
    expect(screen.getByText("Nickname")).toBeTruthy();
    expect(screen.getByLabelText("Choose a profile photo")).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();
    expect(screen.getByText("Confirm password")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeTruthy();
    expect(screen.getByText("Sign in")).toBeTruthy();
  });

  it("refuses an empty form and names every problem", async () => {
    render(<SignUpScreen />);

    fireEvent.press(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findByText("The full name must be at least 3 characters")
    ).toBeTruthy();
    expect(screen.getByText("Please enter a valid email address")).toBeTruthy();
    expect(
      screen.getAllByText("The password must be at least 12 characters").length
    ).toBe(2);
    expect(signUp).not.toHaveBeenCalled();
  });

  it("refuses a password that does not meet the backend policy", async () => {
    render(<SignUpScreen />);

    fillForm("douzecaracteres");
    fireEvent.press(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findAllByText(
        "The password must contain at least one uppercase letter, one digit and one special character"
      )
    ).toHaveLength(2);
    expect(signUp).not.toHaveBeenCalled();
  });

  it("creates the account and moves on to the welcome flow", async () => {
    signUp.mockResolvedValue(undefined);
    render(<SignUpScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() =>
      expect(signUp).toHaveBeenCalledWith(
        "camille@example.com",
        "Supersecret1!",
        "Camille Dupont",
        ""
      )
    );
    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("/welcome")
    );
  });

  it("passes the surname along when the player gives one", async () => {
    signUp.mockResolvedValue(undefined);
    render(<SignUpScreen />);

    fillForm();
    fireEvent.changeText(
      screen.getByPlaceholderText("Optional, the name the team uses"),
      "Cami"
    );
    fireEvent.press(screen.getByRole("button", { name: "Sign up" }));

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
    fireEvent.press(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findByText("An account with this email already exists.")
    ).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();
  });
});
