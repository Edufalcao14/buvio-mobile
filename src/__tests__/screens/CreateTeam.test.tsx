import React from "react";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { render, screen, fireEvent, waitFor } from "@/test-utils/render";
import CreateTeamScreen from "@/features/team/screens/CreateTeam";
import { CreateTeamDocument } from "@/graphql/generated/hooks";

const createTeamRequest = {
  query: CreateTeamDocument,
  variables: { name: "Les Invincibles", sport: null },
};

const createdTeam = {
  __typename: "Team",
  id: "team-1",
  name: "Les Invincibles",
  code: "AB12C",
  sport: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  creator: {
    __typename: "User",
    id: "user-1",
    displayName: "Camille",
    email: "camille@example.com",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    deletedAt: null,
    externalId: "ext-1",
  },
};

describe("CreateTeamScreen", () => {
  beforeEach(() => jest.clearAllMocks());

  it("explains what the code is for and shows both fields", () => {
    render(<CreateTeamScreen />);

    expect(screen.getByText("Create a team")).toBeTruthy();
    expect(
      screen.getByText("Name your team to get a unique invite code.")
    ).toBeTruthy();
    expect(screen.getByText("Team name")).toBeTruthy();
    expect(screen.getByText("Sport (optional)")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Create the team" })
    ).toBeTruthy();
  });

  it("refuses a name shorter than three characters", async () => {
    render(<CreateTeamScreen />);

    fireEvent.changeText(
      screen.getByPlaceholderText("e.g. The Invincibles"),
      "AB"
    );
    fireEvent.press(screen.getByRole("button", { name: "Create the team" }));

    expect(
      await screen.findByText("The team name must be at least 3 characters")
    ).toBeTruthy();
  });

  it("creates the team, confirms it and lands on the team tabs", async () => {
    render(<CreateTeamScreen />, {
      mocks: [
        {
          request: createTeamRequest,
          result: { data: { createTeam: createdTeam } },
        },
      ],
    });

    fireEvent.changeText(
      screen.getByPlaceholderText("e.g. The Invincibles"),
      "Les Invincibles"
    );
    fireEvent.press(screen.getByRole("button", { name: "Create the team" }));

    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("/(tabs)/team")
    );
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        text1: "Team created",
      })
    );
  });

  it("shows the server error and stays on the screen", async () => {
    render(<CreateTeamScreen />, {
      mocks: [
        {
          request: createTeamRequest,
          // A GraphQL error, not a network one: errorPolicy "all" delivers
          // it on result.errors, which is the path the view model reads.
          result: {
            errors: [
              {
                message: "TEAM_CODE_TAKEN",
                extensions: { errorCode: "TEAM_CODE_TAKEN" },
              },
            ],
          },
        },
      ],
    });

    fireEvent.changeText(
      screen.getByPlaceholderText("e.g. The Invincibles"),
      "Les Invincibles"
    );
    fireEvent.press(screen.getByRole("button", { name: "Create the team" }));

    expect(
      await screen.findByText("This team code is already taken.")
    ).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: "error" })
    );
  });
});
