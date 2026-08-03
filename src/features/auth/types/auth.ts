import { UserData } from "./user";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiredAt?: Date;
};

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  _hasHydrated: boolean;
}

export interface AuthContextType extends AuthState {
  setAsyncStorage: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  setHasHydrated: () => void;
  signIn: (email: string, password: string) => Promise<UserData>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    nickname?: string | null,
  ) => Promise<void>;
  signInLoading: boolean;
  signUpLoading: boolean;
  userData: UserData | null;
}