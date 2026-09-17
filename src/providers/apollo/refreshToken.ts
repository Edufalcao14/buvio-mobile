import { getEnvironmentBaseURL } from "@/utils/environment";
import { saveAuthState } from "@/utils/auth/secureStore";
import type { AuthTokens } from "@/types/auth";

/**
 * Refresh auth tokens
 */
export const refreshTokens = async (
  refreshToken: string
): Promise<AuthTokens> => {
  const baseUrl = getEnvironmentBaseURL();
  if (!baseUrl) {
    throw new Error("Environment base URL is not defined");
  }

  const body = {
    operationName: "RefreshToken",
    query: `mutation RefreshToken($input: RefreshTokenInput!) {
        refreshToken(input: $input) {
          accessToken
          refreshToken
          expiredAt
        }
      }`,
    variables: {
      input: { refreshToken },
    },
  };

  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  const newAuthState: AuthTokens = {
    accessToken: data.data.refreshToken.accessToken,
    refreshToken: data.data.refreshToken.refreshToken,
  };

  // Straight back into the secure store, so the rotated refresh token
  // replaces the spent one everywhere it is read from.
  await saveAuthState(newAuthState);

  return newAuthState;
};
