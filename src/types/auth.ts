import type { MeQuery, SignInMutation } from "@/graphql/generated/hooks";

/**
 * Session and identity types.
 *
 * These live in `src/types/` rather than inside the auth feature because the
 * Apollo links and the session provider - both app-level infrastructure -
 * need them, and infrastructure must not depend on a feature
 * (see docs/ARCHITECTURE.md, the dependency table).
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/** The signed-in user, as the `Me` query shapes it. */
export type UserData = NonNullable<MeQuery["me"]>;

/** The user as the sign-in mutation returns it - a different schema type. */
export type SignedInUser = SignInMutation["signIn"]["user"];

export interface AuthContextType extends AuthState {
  setAsyncStorage: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<SignedInUser>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    nickname?: string | null
  ) => Promise<void>;
  signInLoading: boolean;
  signUpLoading: boolean;
  userData: UserData | null;
}
