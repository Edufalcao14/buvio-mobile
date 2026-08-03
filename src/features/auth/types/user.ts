export type UserData = {
  id: string;
  email: string;
  displayName: string;
  /** The name the squad knows this player by. Null puts them on the fallback. */
  nickname?: string | null;
  /** The player's own picture. Null until they have uploaded one. */
  avatarUrl?: string | null;
  team?: {
    id: string;
    name: string;
    code: string;
    sport?: string | null;
    /** The club badge. Null while the team still shows a monogram. */
    crestUrl?: string | null;
    creator: {
      id: string;
      displayName: string;
      externalId: string;
      email: string;
    };
  } | null;
};

export type UserInput = {
  displayName: string;
  email: string;
  password: string;
};

export type AuthPayload = {
  user: UserData;
  refreshToken: string;
  accessToken: string;
};

export type User = {
  id: string;
  email: string;
  displayName: string;
  nickname?: string | null;
  avatarUrl?: string | null;
};
