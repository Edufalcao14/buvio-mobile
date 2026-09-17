import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthTokens } from "@/types/auth";

/**
 * The session tokens, kept in the platform's secure store.
 *
 * The access token and - far more importantly - the long-lived refresh token
 * are credentials. AsyncStorage is an unencrypted file inside the app
 * sandbox, which a device backup or a rooted phone can read; the Keychain
 * (iOS) and the Keystore (Android) are what these belong in.
 *
 * `WHEN_UNLOCKED_THIS_DEVICE_ONLY` is deliberate: the tokens should not ride
 * an iCloud Keychain sync to the user's other devices, and nothing should be
 * readable while the phone is locked.
 */
const KEY = "buvio.session";

const OPTIONS: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

/** The key the tokens used to live under, in the clear. */
const LEGACY_ASYNC_KEY = "auth-storage";

export const saveAuthState = async (tokens: AuthTokens): Promise<void> => {
  await SecureStore.setItemAsync(KEY, JSON.stringify(tokens), OPTIONS);
};

/**
 * Reads the session, migrating a pre-existing plaintext one on the way.
 *
 * An app already installed has its tokens in AsyncStorage. Moving them on
 * first read means an upgrade does not sign everyone out, and the plaintext
 * copy is deleted in the same step rather than left behind.
 */
export const loadAuthState = async (): Promise<AuthTokens | null> => {
  try {
    const stored = await SecureStore.getItemAsync(KEY, OPTIONS);

    if (stored) {
      return JSON.parse(stored) as AuthTokens;
    }

    const legacy = await AsyncStorage.getItem(LEGACY_ASYNC_KEY);

    if (!legacy) {
      return null;
    }

    const tokens = JSON.parse(legacy) as AuthTokens;

    await saveAuthState(tokens);
    await AsyncStorage.removeItem(LEGACY_ASYNC_KEY);

    return tokens;
  } catch {
    // A corrupt or unreadable entry is a signed-out app, not a crash. The
    // value is never logged: it is a credential.
    return null;
  }
};

export const clearAuthState = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(KEY, OPTIONS);
  await AsyncStorage.removeItem(LEGACY_ASYNC_KEY);
};
