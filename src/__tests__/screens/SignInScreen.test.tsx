import React from "react";
import { router } from "expo-router";
import { render, screen, fireEvent, waitFor } from "@/test-utils/render";
import SignInScreen from "@/features/auth/screens/SignInScreen";
import { useAuth } from "@/providers/AuthProvider";

jest.mock("@/providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

const signIn = jest.fn();
const mockedUseAuth = useAuth as unknown as jest.Mock;

const fillForm = (email = "user@example.com", password = "supersecret") => {
  fireEvent.changeText(screen.getByPlaceholderText("you@email.com"), email);
  fireEvent.changeText(
    screen.getByPlaceholderText("6 characters minimum"),
    password
  );
};

describe("SignInScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuth.mockReturnValue({ signIn });
  });

  it("renders the title, the fields and the call to action", () => {
    render(<SignInScreen />);

    expect(screen.getByRole("header", { name: "Sign in" })).toBeTruthy();
    expect(
      screen.getByText("Back to your team and the latest verdict.")
    ).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeTruthy();
    expect(screen.getByText("Forgot your password?")).toBeTruthy();
    expect(screen.getByText("Sign up")).toBeTruthy();
  });

  it("blocks the submit and shows the field errors when the form is empty", async () => {
    render(<SignInScreen />);

    fireEvent.press(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Please enter a valid email address")
    ).toBeTruthy();
    expect(
      screen.getByText("The password must be at least 6 characters")
    ).toBeTruthy();
    expect(signIn).not.toHaveBeenCalled();
  });

  it("sends the user to the team tabs when they already have a team", async () => {
    signIn.mockResolvedValue({ id: "1", team: { id: "t1" } });
    render(<SignInScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("user@example.com", "supersecret")
    );
    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("/(tabs)/team")
    );
  });

  it("sends a teamless user to the welcome flow", async () => {
    signIn.mockResolvedValue({ id: "1", team: null });
    render(<SignInScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("/welcome")
    );
  });

  it("shows the server error message when the credentials are refused", async () => {
    signIn.mockRejectedValue({
      graphQLErrors: [
        {
          message: "AUTH_INVALID_CREDENTIALS",
          extensions: { errorCode: "AUTH_INVALID_CREDENTIALS" },
        },
      ],
    });
    render(<SignInScreen />);

    fillForm();
    fireEvent.press(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Incorrect email or password. Please try again.")
    ).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();
  });
});
