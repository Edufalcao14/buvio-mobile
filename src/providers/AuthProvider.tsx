import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useSignInMutation,
  useSignUpMutation,
  useMeQuery,
} from "@/graphql/generated/hooks";
import { AuthState, AuthContextType } from "@/features/auth/types/auth";
import { UserData } from "@/features/auth/types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth-storage";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
    _hasHydrated: true,
  });

  const isMounted = useRef(true);

  // GraphQL mutations
  const [signInMutation, { loading: signInLoading }] = useSignInMutation();
  const [signUpMutation, { loading: signUpLoading }] = useSignUpMutation();

  const { data: meData, refetch: refetchMe } = useMeQuery({
    skip: !state.isAuthenticated,
    fetchPolicy: "network-only",
  });

  // Properly extract user data from the query result
  const userData = state.isAuthenticated && meData?.me ? meData.me : null;

  const setAsyncStorage = useCallback(
    async (accessToken: string, refreshToken: string) => {
      if (!isMounted.current) return;

      const newState = {
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        _hasHydrated: state._hasHydrated,
      };

      setState(newState);

      try {
        await AsyncStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            accessToken,
            refreshToken,
            isAuthenticated: true,
          })
        );

        // Refetch user data after login
        if (refetchMe) {
          refetchMe();
        }
      } catch (error) {
        console.error(
          "Échec de la sauvegarde de l'état d'authentification:",
          error
        );
      }
    },
    [state._hasHydrated, refetchMe]
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

    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error(
        "Échec de la suppression de l'état d'authentification:",
        error
      );
    }
  }, []);

  const setHasHydrated = useCallback(() => {
    if (!isMounted.current) return;
    setState((prev) => ({ ...prev, _hasHydrated: true }));
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<UserData> => {
      try {
        const response = await signInMutation({
          variables: { email, password },
        });

        if (response.errors) {
          throw new Error(response.errors[0].message);
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
          throw new Error(
            "Erreur lors de la connexion, veuillez réessayer plus tard"
          );
        }
      } catch (error) {
        throw new Error((error as Error).message);
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
          throw new Error(response.errors[0].message);
        }

        if (response?.data?.createUser) {
          const { accessToken, refreshToken } = response.data.createUser;
          await setAsyncStorage(accessToken, refreshToken);
          setState((prev) => ({
            ...prev,
            isAuthenticated: true,
          }));
        } else {
          throw new Error(
            "Échec de l'inscription, veuillez réessayer plus tard"
          );
        }
      } catch (error) {
        console.error("Échec de l'inscription:", error);
        throw new Error((error as Error).message);
      }
    },
    [signUpMutation, setAsyncStorage]
  );

  useEffect(() => {
    isMounted.current = true;

    const loadAsyncStorage = async () => {
      try {
        const storedAuthState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (!isMounted.current) return;

        if (storedAuthState) {
          const parsedState = JSON.parse(storedAuthState);

          // load data from Async Storage
          setState({
            accessToken: parsedState.accessToken,
            refreshToken: parsedState.refreshToken,
            isAuthenticated: Boolean(parsedState.accessToken),
            isLoading: false,
            _hasHydrated: false,
          });

          // After restoring tokens, refetch user data
          if (parsedState.accessToken && refetchMe) {
            refetchMe();
          }
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            _hasHydrated: false,
          }));
        }
      } catch (error) {
        console.error(
          "Échec du chargement de l'état d'authentification:",
          error
        );
        if (isMounted.current) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            _hasHydrated: false,
          }));
        }
      }
    };

    loadAsyncStorage();

    return () => {
      isMounted.current = false;
    };
  }, [refetchMe]);

  const contextValue: AuthContextType = {
    ...state,
    setAsyncStorage,
    logout,
    setHasHydrated,
    signIn,
    signUp,
    signInLoading,
    signUpLoading,
    userData,
  };

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
