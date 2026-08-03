import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthTokens } from "@/features/auth/types/auth";

/**
 * The stored session, read straight from AsyncStorage.
 *
 * It lives in its own module rather than beside the client because both
 * transports need it — the HTTP auth middleware and the WebSocket
 * `connectionParams` — and importing it from `client.ts` would close a cycle
 * between the client and the socket link.
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
