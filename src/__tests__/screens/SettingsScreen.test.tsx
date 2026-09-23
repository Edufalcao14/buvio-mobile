import React from "react";
import { Alert, Clipboard, Share } from "react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { render, screen, fireEvent, waitFor } from "@/test-utils/render";
import SettingsScreen from "@/features/settings/screens/SettingsScreen";
import { useAuth } from "@/providers/AuthProvider";

jest.mock("@/providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

const logout = jest.fn();
const mockedUseAuth = useAuth as unknown as jest.Mock;

const userWithTeam = {
  id: "me-1",
  displayName: "Camille Dupont",
  nickname: "Cami",
  avatarUrl: null,
  email: "camille@example.com",
  team: {
    id: "team-1",
    name: "Les Invincibles",
    code: "AB12C",
    sport: "Football",
    crestUrl: null,
    // Someone else founded the club, so the crest is not this player's to set.
    creator: { id: "founder-1" },
  },
};

describe("SettingsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuth.mockReturnValue({ userData: userWithTeam, logout });
    jest.spyOn(Clipboard, "setString").mockImplementation(() => {});
    jest.spyOn(Share, "share").mockResolvedValue({ action: "sharedAction" });
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => jest.restoreAllMocks());

  it("shows the player's two names, the club and the invitation code", () => {
    render(<SettingsScreen />);

    expect(screen.getByDisplayValue("Camille Dupont")).toBeTruthy();
    expect(screen.getByDisplayValue("Cami")).toBeTruthy();
    expect(screen.getByText("camille@example.com")).toBeTruthy();
    // The club name is both the header title and the team card.
    // The bar names the screen; the club appears once, on its own card.
    expect(screen.getByText("Settings")).toBeTruthy();
    expect(screen.getAllByText("Les Invincibles")).toHaveLength(1);
    expect(screen.getByText("Invite code")).toBeTruthy();
    expect(screen.getByText("Football")).toBeTruthy();
    expect(screen.getByText("AB12C")).toBeTruthy();
  });

  it("falls back to a dash and hides the club block for a teamless player", () => {
    mockedUseAuth.mockReturnValue({
      userData: { id: "me-1", displayName: null, email: null, team: null },
      logout,
    });

    render(<SettingsScreen />);

    expect(screen.getByText("-")).toBeTruthy();
    expect(screen.queryByText("Invite code")).toBeNull();
  });

  it("offers the avatar to everyone and the crest to no one but the founder", () => {
    render(<SettingsScreen />);

    expect(screen.getByLabelText("Change the profile photo")).toBeTruthy();
    expect(screen.queryByLabelText("Change the team crest")).toBeNull();
  });

  it("lets the club's founder change the crest", () => {
    mockedUseAuth.mockReturnValue({
      userData: {
        ...userWithTeam,
        team: { ...userWithTeam.team, creator: { id: "me-1" } },
      },
      logout,
    });

    render(<SettingsScreen />);

    expect(screen.getByLabelText("Change the team crest")).toBeTruthy();
  });

  it("copies the code and confirms it with a toast", () => {
    render(<SettingsScreen />);

    fireEvent.press(screen.getByLabelText("Copy the invite code"));

    expect(Clipboard.setString).toHaveBeenCalledWith("AB12C");
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: "success", text1: "Code AB12C copied" })
    );
  });

  it("shares an invitation naming the club and the code", async () => {
    render(<SettingsScreen />);

    fireEvent.press(screen.getByLabelText("Share the invite code"));

    await waitFor(() =>
      expect(Share.share).toHaveBeenCalledWith({
        message: "Join Les Invincibles on Buvio with the code AB12C",
      })
    );
  });

  it("asks for confirmation before signing out, then clears the session", async () => {
    render(<SettingsScreen />);

    fireEvent.press(screen.getByLabelText("Sign out"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Sign out?",
      "You'll need your email and password to come back.",
      expect.any(Array)
    );
    expect(logout).not.toHaveBeenCalled();

    // Take the destructive branch the user would tap in the dialog.
    const buttons = (Alert.alert as jest.Mock).mock.calls[0][2];
    await buttons[1].onPress();

    expect(logout).toHaveBeenCalled();
    expect(router.replace).toHaveBeenCalledWith("/");
  });

  it("goes back from the header", () => {
    render(<SettingsScreen />);

    fireEvent.press(screen.getByLabelText("Back"));

    expect(router.back).toHaveBeenCalled();
  });
});
