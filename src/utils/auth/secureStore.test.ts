import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { clearAuthState, loadAuthState, saveAuthState } from "./secureStore";

jest.mock("expo-secure-store", () => ({
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: "whenUnlockedThisDeviceOnly",
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const secure = SecureStore as jest.Mocked<typeof SecureStore>;
const async = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

const TOKENS = { accessToken: "access-1", refreshToken: "refresh-1" };

describe("the session store", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    secure.getItemAsync.mockResolvedValue(null);
    async.getItem.mockResolvedValue(null);
  });

  it("writes the session to the device keychain, not to plain storage", async () => {
    await saveAuthState(TOKENS);

    expect(secure.setItemAsync).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(TOKENS),
      expect.objectContaining({
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      })
    );
  });

  it("reads the session back", async () => {
    secure.getItemAsync.mockResolvedValue(JSON.stringify(TOKENS));

    await expect(loadAuthState()).resolves.toEqual(TOKENS);
  });

  it("migrates a pre-upgrade plaintext session and deletes the copy", async () => {
    // An app installed before this change has its tokens in AsyncStorage.
    // Moving them on first read is what stops the upgrade signing everyone out.
    async.getItem.mockResolvedValue(JSON.stringify(TOKENS));

    await expect(loadAuthState()).resolves.toEqual(TOKENS);

    expect(secure.setItemAsync).toHaveBeenCalled();
    expect(async.removeItem).toHaveBeenCalledWith("auth-storage");
  });

  it("prefers the secure copy and never re-reads the legacy one", async () => {
    secure.getItemAsync.mockResolvedValue(JSON.stringify(TOKENS));

    await loadAuthState();

    expect(async.getItem).not.toHaveBeenCalled();
  });

  it("reads a signed-out app rather than throwing when the entry is corrupt", async () => {
    secure.getItemAsync.mockResolvedValue("{ not json");

    await expect(loadAuthState()).resolves.toBeNull();
  });

  it("clears both the secure entry and any legacy leftover", async () => {
    await clearAuthState();

    expect(secure.deleteItemAsync).toHaveBeenCalled();
    expect(async.removeItem).toHaveBeenCalledWith("auth-storage");
  });
});
