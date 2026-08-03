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
import { loadAuthState } from "./authState";

export { loadAuthState };

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
    ApolloLink.from([authMiddleware, httpLink]),
  );

  const client = new ApolloClient({
    link: ApolloLink.from([createErrorLink(), transportLink]),
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
