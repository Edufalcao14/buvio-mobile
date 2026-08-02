import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshTokens } from "./refreshToken";

/**
 * Create an enhanced error link for Apollo Client
 */
export const createErrorLink = () => {
  let isRefreshing = false;
  let pendingRequests: Function[] = [];

  // Function to process pending requests
  const resolvePendingRequests = () => {
    pendingRequests.forEach((callback) => callback());
    pendingRequests = [];
  };

  return onError(({ graphQLErrors, operation, forward }) => {
    // Log detailed information about errors for debugging
    if (graphQLErrors) {
      console.log("GraphQL Errors:", JSON.stringify(graphQLErrors, null, 2));

      for (const err of graphQLErrors) {
        // Check for authentication errors that may need token refresh
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.message.includes("authentication") ||
          err.message.includes("Access token expired") ||
          err.message.includes("id-token-expired") ||
          (err.extensions?.code === "INTERNAL_SERVER_ERROR" &&
            err.message.includes("token"))
        ) {
          // Get current auth state to access refresh token
          return fromPromise(
            AsyncStorage.getItem("auth-storage").then(async (authData) => {
              if (!authData) {
                throw new Error("No auth data available");
              }

              const { refreshToken } = JSON.parse(authData);

              if (!refreshToken) {
                throw new Error("No refresh token available");
              }

              // If already refreshing, add this request to the queue
              if (isRefreshing) {
                return new Promise((resolve) => {
                  pendingRequests.push(() => resolve(null));
                });
              }

              isRefreshing = true;

              try {
                // Attempt to refresh the token
                const newTokens = await refreshTokens(refreshToken);

                // Update operation context with new token
                operation.setContext({
                  headers: {
                    ...operation.getContext().headers,
                    authorization: `Bearer ${newTokens.accessToken}`,
                  },
                });

                // Process all pending requests with new token
                resolvePendingRequests();
                return null;
              } catch (error) {
                // On refresh failure, clear pending requests
                pendingRequests = [];
                throw error;
              } finally {
                isRefreshing = false;
              }
            })
          ).flatMap(() => forward(operation));
        }
      }
    }

    return forward(operation);
  });
};
