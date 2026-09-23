import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  clearAuthState,
  loadAuthState,
  saveAuthState,
} from "@/utils/auth/secureStore";
import { clearApolloSession } from "@/providers/apollo/client";
import { identifyUser, reportError } from "@/lib/monitoring";
import {
  useSignInMutation,
  useSignUpMutation,
  useMeQuery,
} from "@/graphql/generated/hooks";
import type { AuthContextType, AuthState, SignedInUser } from "@/types/auth";
import { t } from "@/i18n";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const isMounted = useRef(true);

  // GraphQL mutations
  const [signInMutation, { loading: signInLoading }] = useSignInMutation();
  const [signUpMutation, { loading: signUpLoading }] = useSignUpMutation();

  const {
    data: meData,
    loading: meLoading,
    refetch: refetchMe,
  } = useMeQuery({
    skip: !state.isAuthenticated,
    fetchPolicy: "network-only",
  });

  // The session is not "loaded" until the first `me` has landed: the token
  // restore and the profile fetch are two steps, and a router that redirects
  // between them sees an authenticated user with no team and strands a
  // player who *has* one on the welcome screen. Only the first fetch gates —
  // a refetch keeps the previous `data`, so it never flips this back on.
  const isSessionLoading =
    state.isLoading || (state.isAuthenticated && meLoading && !meData);

  // Properly extract user data from the query result
  const userData = state.isAuthenticated && meData?.me ? meData.me : null;

  // Ties a crash report to an account by id alone - never an email or a name,
  // so a stack trace never becomes a personal-data record.
  useEffect(() => {
    identifyUser(userData?.id ?? null);
  }, [userData?.id]);

  const setAsyncStorage = useCallback(
    async (accessToken: string, refreshToken: string) => {
      if (!isMounted.current) return;

      setState({
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });

      try {
        await saveAuthState({ accessToken, refreshToken });

        // Refetch user data after login
        if (refetchMe) {
          refetchMe();
        }
      } catch {
        // Never log the error object here: it can carry the token value.
        // The session still works in memory; it just will not survive a
        // restart, which the next sign-in fixes.
      }
    },
    [refetchMe]
  );

  const logout = useCallback(async () => {
    if (!isMounted.current) return;

    setState((prev) => ({
      ...prev,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    }));

    // All three, in order: the stored credential, the cached data of the
    // user who just left, and the authenticated socket. Clearing only the
    // first leaves the next person on this phone holding the other two.
    try {
      await clearAuthState();
    } finally {
      await clearApolloSession();
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<SignedInUser> => {
      try {
        const response = await signInMutation({
          variables: { email, password },
        });

        if (response.errors) {
          // Rethrown whole, not flattened to a string: the caller needs
          // extensions.errorCode to map this to French copy.
          throw { graphQLErrors: response.errors };
        }

        if (response?.data?.signIn) {
          const { accessToken, refreshToken } = response.data.signIn;
          await setAsyncStorage(accessToken, refreshToken);
          setState((prev) => ({
            ...prev,
            isAuthenticated: true,
          }));
          return response.data.signIn.user;
        } else {
          throw new Error(t("auth.signInError"));
        }
      } catch (error) {
        reportError(error, "sign-in");
        throw error;
      }
    },
    [signInMutation, setAsyncStorage]
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
      nickname?: string | null
    ): Promise<void> => {
      try {
        const response = await signUpMutation({
          // An empty surname field is not a nickname: it is sent as null so the
          // backend leaves the player on the display-name fallback.
          variables: {
            email,
            password,
            displayName,
            nickname: nickname?.trim() || null,
          },
        });

        if (response.errors) {
          // Rethrown whole, not flattened to a string: the caller needs
          // extensions.errorCode to map this to French copy.
          throw { graphQLErrors: response.errors };
        }

        if (response?.data?.createUser) {
          const { accessToken, refreshToken } = response.data.createUser;
          await setAsyncStorage(accessToken, refreshToken);
          setState((prev) => ({
            ...prev,
            isAuthenticated: true,
          }));
        } else {
          throw new Error(t("auth.signUpError"));
        }
      } catch (error) {
        reportError(error, "sign-up");
        throw error;
      }
    },
    [signUpMutation, setAsyncStorage]
  );

  useEffect(() => {
    isMounted.current = true;

    const restoreSession = async () => {
      // Reads the secure store, migrating a pre-upgrade plaintext session on
      // the way, so an existing install is not signed out by the change.
      const tokens = await loadAuthState();

      if (!isMounted.current) return;

      setState({
        accessToken: tokens?.accessToken ?? null,
        refreshToken: tokens?.refreshToken ?? null,
        isAuthenticated: Boolean(tokens?.accessToken),
        isLoading: false,
      });

      if (tokens?.accessToken && refetchMe) {
        refetchMe();
      }
    };

    restoreSession();

    return () => {
      isMounted.current = false;
    };
  }, [refetchMe]);

  // Memoised: without this every state change hands a brand-new object to
  // every useAuth() consumer, re-rendering the whole tree.
  const contextValue = useMemo<AuthContextType>(
    () => ({
      ...state,
      isLoading: isSessionLoading,
      setAsyncStorage,
      logout,
      signIn,
      signUp,
      signInLoading,
      signUpLoading,
      userData,
    }),
    [
      state,
      isSessionLoading,
      setAsyncStorage,
      logout,
      signIn,
      signUp,
      signInLoading,
      signUpLoading,
      userData,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
