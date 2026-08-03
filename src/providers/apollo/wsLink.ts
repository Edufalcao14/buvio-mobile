import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getEnvironmentBaseURL } from "@/utils/environment";
import { loadAuthState } from "./authState";

/**
 * The realtime half of the link chain.
 *
 * The backend serves graphql-ws on the same `/graphql` path as the HTTP
 * endpoint, so the socket URL is the HTTP base with the scheme swapped —
 * deriving it means one env var keeps governing both transports.
 */
export const getWebSocketURL = (): string => {
  const baseUrl = getEnvironmentBaseURL();

  if (!baseUrl) {
    throw new Error("Environment base URL is not defined");
  }

  return baseUrl.replace(/^http/, "ws") + "/graphql";
};

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
    }),
  );
