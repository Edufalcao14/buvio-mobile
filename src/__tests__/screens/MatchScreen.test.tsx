import React from "react";
import { render, screen, fireEvent, act } from "@/test-utils/render";
import MatchScreen from "@/features/match/screens/MatchScreen";
import { GetTeamMembersDocument } from "@/graphql/generated/hooks";

const teamMembersMock = {
  request: { query: GetTeamMembersDocument },
  result: {
    data: {
      getTeamMembers: [
        {
          __typename: "User",
          id: "user-1",
          displayName: "Camille Dupont",
          email: "camille@example.com",
          createdAt: "2026-01-01T00:00:00.000Z",
          updatedAt: "2026-01-01T00:00:00.000Z",
          deletedAt: null,
          externalId: "ext-1",
          team: {
            __typename: "Team",
            name: "Les Invincibles",
            code: "AB12C",
            sport: "Football",
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
            creator: {
              __typename: "User",
              displayName: "Camille Dupont",
              email: "camille@example.com",
            },
          },
        },
      ],
    },
  },
};

describe("MatchScreen", () => {
  // The team-members query resolves after the assertions; flushing it keeps
  // React from updating the modal outside act().
  const flushQueries = () => act(async () => {});

  it("nudges the team to create a match when there is none", async () => {
    render(<MatchScreen />, { mocks: [teamMembersMock] });

    expect(
      screen.getByLabelText("Toujours pas de match ? Le chopp va chauffer…"),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Créez un match avec le bouton + pour lancer la prochaine rencontre.",
      ),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Créer un match" })).toBeTruthy();

    await flushQueries();
  });

  it("keeps the creation modal closed until the + is pressed", async () => {
    render(<MatchScreen />, { mocks: [teamMembersMock] });

    expect(screen.queryByText("Créer un Match")).toBeNull();

    fireEvent.press(screen.getByRole("button", { name: "Créer un match" }));

    expect(screen.getByText("Créer un Match")).toBeTruthy();
    expect(screen.getByText("Nouveau match")).toBeTruthy();
    expect(screen.getByPlaceholderText("Ex: Match du dimanche")).toBeTruthy();

    await flushQueries();
  });

  it("closes the modal again from its back arrow", async () => {
    render(<MatchScreen />, { mocks: [teamMembersMock] });

    fireEvent.press(screen.getByRole("button", { name: "Créer un match" }));
    fireEvent.press(screen.getByRole("button", { name: "Fermer" }));

    expect(screen.queryByText("Nouveau match")).toBeNull();

    await flushQueries();
  });
});
