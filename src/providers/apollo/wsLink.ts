import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getWebSocketBaseURL } from "@/utils/environment";
import { loadAuthState } from "@/utils/auth/secureStore";

/**
 * The realtime half of the link chain.
 *
 * The backend serves graphql-ws on the same `/graphql` path as the HTTP
 * endpoint, so one environment variable governs both transports. The scheme
 * is derived in `getWebSocketBaseURL`, which refuses cleartext outside local
 * development - the socket carries the same bearer token the HTTP link does.
 */
export const getWebSocketURL = (): string => `${getWebSocketBaseURL()}/graphql`;

export const createWsLink = () =>
  new GraphQLWsLink(
    createClient({
      url: getWebSocketURL(),
      // Lazy so a signed-out app never opens a socket, and so the token is
      // read at connection time rather than at module load.
      lazy: true,
      // The phone loses the network constantly (tunnel, lift, app resumed
      // from background). Always retry: a dropped socket is normal here, not
      // a fatal error, and the subscription re-subscribes on reconnect.
      shouldRetry: () => true,
      retryAttempts: Infinity,
      connectionParams: async () => {
        const tokens = await loadAuthState();

        return tokens?.accessToken
          ? { authorization: `Bearer ${tokens.accessToken}` }
          : {};
      },
    })
  );
