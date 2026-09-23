import React from "react";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { MockedResponse } from "@apollo/client/testing";
import { render, screen, fireEvent, waitFor } from "@/test-utils/render";
import JoinTeamScreen from "@/features/team/screens/JoinTeam";
import {
  JoinTeamDocument,
  ValidateTeamCodeDocument,
} from "@/graphql/generated/hooks";

const CODE = "AB12C";

/**
 * The code is typed one box at a time, so the screen validates every prefix
 * on the way ("A", "AB", …). Only the complete code is a real team.
 */
const validationMocks = (finalResult: boolean): MockedResponse[] =>
  // The full code appears twice: joining resets the Apollo store, which
  // refetches the still-active validation query.
  [1, 2, 3, 4, 5, 5].map((length) => ({
    request: {
      query: ValidateTeamCodeDocument,
      variables: { code: CODE.slice(0, length) },
    },
    result: {
      data: { validateTeamCode: length === 5 ? finalResult : false },
    },
  }));

const joinedTeam = {
  __typename: "Team",
  id: "team-1",
  name: "Les Invincibles",
  code: CODE,
  sport: "Football",
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

const typeCode = async (code = CODE) => {
  for (const [index, character] of [...code].entries()) {
    fireEvent.changeText(screen.getByTestId(`code-input-${index}`), character);
  }
  // Let the per-prefix validation query settle before submitting.
  await waitFor(() => expect(screen.getByText(code)).toBeTruthy());
};

describe("JoinTeamScreen", () => {
  beforeEach(() => jest.clearAllMocks());

  it("asks for a five character code and keeps the action disabled until then", () => {
    render(<JoinTeamScreen />);

    expect(screen.getByText("Join a team")).toBeTruthy();
    expect(
      screen.getByText("The code is 5 alphanumeric characters")
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Join the team" })
    ).toBeDisabled();
  });

  it("spreads a pasted code across the boxes instead of keeping one letter", async () => {
    render(<JoinTeamScreen />, { mocks: validationMocks(true) });

    // A paste (or a fast typist) lands the whole code in the first box.
    fireEvent.changeText(screen.getByTestId("code-input-0"), CODE);

    await waitFor(() => expect(screen.getByText(CODE)).toBeTruthy());
    expect(screen.getByRole("button", { name: "Join the team" })).toBeEnabled();
  });

  it("enables the action once the five boxes are filled", async () => {
    render(<JoinTeamScreen />, { mocks: validationMocks(true) });

    await typeCode();

    expect(
      screen.getByRole("button", { name: "Join the team" })
    ).not.toBeDisabled();
  });

  it("joins the team and moves to the team tabs", async () => {
    render(<JoinTeamScreen />, {
      mocks: [
        ...validationMocks(true),
        {
          request: { query: JoinTeamDocument, variables: { code: CODE } },
          result: { data: { joinTeam: joinedTeam } },
        },
      ],
    });

    await typeCode();
    fireEvent.press(screen.getByRole("button", { name: "Join the team" }));

    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("/(tabs)/team")
    );
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        text1: "You joined the team Les Invincibles.",
      })
    );
  });

  it("tells the user when no team carries that code", async () => {
    render(<JoinTeamScreen />, { mocks: validationMocks(false) });

    await typeCode();
    fireEvent.press(screen.getByRole("button", { name: "Join the team" }));

    await waitFor(() =>
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
          text1: `No team found with the code ${CODE}`,
        })
      )
    );
    expect(router.replace).not.toHaveBeenCalled();
  });
});
