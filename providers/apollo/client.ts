import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEnvironmentBaseURL } from "../../utils/environment";
import { AuthTokens } from "../../types/auth";
import { createErrorLink } from "./error";

/**
 * Load auth state from AsyncStorage
 */
export const loadAuthState = async (): Promise<AuthTokens | null> => {
  try {
    const storedAuthState = await AsyncStorage.getItem("auth-storage");
    if (storedAuthState) {
      const parsedState: AuthTokens = JSON.parse(storedAuthState);
      return parsedState;
    }
    return null;
  } catch (error) {
    console.error("Failed to load auth state:", error);
    return null;
  }
};

/**
 * Create and return Apollo client with auth handling
 * @returns Configured ApolloClient instance
 */
export function createAuthenticatedApolloClient() {
  const httpLink = new HttpLink({
    uri: getEnvironmentBaseURL() + "/graphql",
  });
  
  const authMiddleware = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      loadAuthState()
        .then((tokens) => {
          operation.setContext({
            headers: {
              authorization: tokens?.accessToken
                ? `Bearer ${tokens.accessToken}`
                : "",
            },
          });
          forward(operation).subscribe(observer);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  });

  const client = new ApolloClient({
    link: ApolloLink.from([createErrorLink(), authMiddleware, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    connectToDevTools: __DEV__,
  });

  return client;
}

// Export default instance for backward compatibility
export const apolloClient = createAuthenticatedApolloClient();

export default apolloClient;
