import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEnvironmentBaseURL } from "../../utils/environment";
import { AuthTokens } from "../../types/auth";

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

  // Update AsyncStorage with new tokens
  await AsyncStorage.setItem("auth-storage", JSON.stringify(newAuthState));

  return newAuthState;
};
