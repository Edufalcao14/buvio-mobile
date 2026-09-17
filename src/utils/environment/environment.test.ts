import { Environment } from "@/types/environment";

/**
 * The guard that used to not exist: an unrecognised environment silently
 * produced `undefined` as the server address, and nothing insisted on HTTPS,
 * so the bearer token could travel in the clear on a misconfiguration.
 */
describe("getEnvironmentBaseURL", () => {
  const ORIGINAL = { ...process.env };

  afterEach(() => {
    process.env = { ...ORIGINAL };
    jest.resetModules();
  });

  // require() rather than import(): the module caches its validated config on
  // first read, so each case needs a fresh copy, and Jest's ESM dynamic import
  // is not enabled here.
  const load = () => {
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("./index") as typeof import("./index");
  };

  it("returns the configured URL for the active environment", () => {
    process.env.EXPO_PUBLIC_ENV = Environment.PRODUCTION;
    process.env.EXPO_PUBLIC_URL_PRODUCTION = "https://api.buvio.app";

    const { getEnvironmentBaseURL } = load();

    expect(getEnvironmentBaseURL()).toBe("https://api.buvio.app");
  });

  it("refuses cleartext outside development", () => {
    process.env.EXPO_PUBLIC_ENV = Environment.PRODUCTION;
    process.env.EXPO_PUBLIC_URL_PRODUCTION = "http://api.buvio.app";

    const { getEnvironmentBaseURL } = load();

    expect(() => getEnvironmentBaseURL()).toThrow(/https/);
  });

  it("allows cleartext in development, where the backend is on the desk", () => {
    process.env.EXPO_PUBLIC_ENV = Environment.DEVELOPMENT;
    process.env.EXPO_PUBLIC_URL_DEVELOPMENT = "http://192.168.1.10:4000";

    const { getEnvironmentBaseURL } = load();

    expect(getEnvironmentBaseURL()).toBe("http://192.168.1.10:4000");
  });

  it("throws rather than returning undefined when the URL is missing", () => {
    process.env.EXPO_PUBLIC_ENV = Environment.QA;
    delete process.env.EXPO_PUBLIC_URL_QA;

    const { getEnvironmentBaseURL } = load();

    expect(() => getEnvironmentBaseURL()).toThrow(/EXPO_PUBLIC_URL_QA/);
  });

  it("rejects an unrecognised environment name at validation", () => {
    process.env.EXPO_PUBLIC_ENV = "prod";

    const { getEnvironmentBaseURL } = load();

    expect(() => getEnvironmentBaseURL()).toThrow(/EXPO_PUBLIC_ENV/);
  });

  it("derives a wss socket from an https base, never ws", () => {
    process.env.EXPO_PUBLIC_ENV = Environment.PRODUCTION;
    process.env.EXPO_PUBLIC_URL_PRODUCTION = "https://api.buvio.app";

    const { getWebSocketBaseURL } = load();

    expect(getWebSocketBaseURL()).toBe("wss://api.buvio.app");
  });
});
