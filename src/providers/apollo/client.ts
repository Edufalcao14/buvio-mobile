import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { getEnvironmentBaseURL } from "@/utils/environment";
import { createErrorLink } from "./error";
import { createWsLink } from "./wsLink";
import { loadAuthState } from "@/utils/auth/secureStore";

/**
 * The normalised cache, created once and exported so it can be persisted
 * to disk (see ApolloProvider) and cleared on sign-out.
 */
export const apolloCache = new InMemoryCache();

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

  // Subscriptions cannot travel over HTTP POST, and queries must not travel
  // over the socket (the error link's token refresh only knows how to replay
  // an HTTP operation). The split routes each kind to the transport that can
  // actually carry it.
  const transportLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    createWsLink(),
    ApolloLink.from([authMiddleware, httpLink])
  );

  const client = new ApolloClient({
    link: ApolloLink.from([createErrorLink(), transportLink]),
    cache: apolloCache,
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

export const apolloClient = createAuthenticatedApolloClient();

/**
 * Drops everything the signed-in session left behind.
 *
 * Removing the stored token is not signing out: the normalised cache still
 * holds the previous user's profile, their squad's email addresses and every
 * ballot, and the subscription socket is still open and authenticated. On a
 * shared phone that is the next person's to read, so logout has to clear both.
 *
 * `clearStore` rather than `resetStore`, because resetting refetches the
 * active queries - as the user we just signed out.
 */
export const clearApolloSession = async (): Promise<void> => {
  try {
    await apolloClient.clearStore();
  } finally {
    // Ends the socket and its retry loop; a later sign-in opens a new one,
    // which re-reads connectionParams and so authenticates as the new user.
    apolloClient.stop();
  }
};

export default apolloClient;
