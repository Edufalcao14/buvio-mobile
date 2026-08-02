export type UserData = {
  id: string;
  email: string;
  displayName: string;
  team?: {
    id: string;
    name: string;
    code: string;
    sport?: string | null;
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
};
