import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshTokens } from "./refreshToken";
import { parseError, TOKEN_REFRESHABLE_CODES } from "@/lib/errors";

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
      console.error("GraphQL Errors:", JSON.stringify(graphQLErrors, null, 2));

      for (const err of graphQLErrors) {
        // The backend reports failures as stable codes in extensions.errorCode.
        // Matching on those instead of on message text means the check no longer
        // breaks when wording changes, and it never misfires on an unrelated
        // error that happens to contain the word "token".
        const { code } = parseError({ graphQLErrors: [err] });

        if (TOKEN_REFRESHABLE_CODES.has(code)) {
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
