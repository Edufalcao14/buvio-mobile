/**
 * Represents the authenticated user's information
 * @property {string} id - Unique identifier for the user
 * @property {string} displayName - User's display name
 * @property {string} email - User's email address
 * @property {string | null} [teamId] - ID of the team the user belongs to, if any
 */
export type Me = {
    id: string;
    displayName: string;
    email: string;
    team?: string | null;
  };
  