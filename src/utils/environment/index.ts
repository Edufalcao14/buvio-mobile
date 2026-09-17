import { getAppEnvironment } from "../env-variables";
import { Environment } from "@/types/environment";

/**
 * The backend address for the active environment.
 *
 * Two rules the previous version did not enforce. The switch is exhaustive
 * over the enum and ends in a `default` that throws, so an unrecognised
 * environment fails loudly instead of returning `undefined` and producing a
 * request to the address "undefined/graphql". And every environment other
 * than local development must be HTTPS: this app carries a bearer token on
 * every request and a long-lived refresh token behind it, and nothing else
 * in the client was asserting the transport.
 */
const URL_BY_ENVIRONMENT: Record<Environment, string | undefined> = {
  [Environment.DEMO]: process.env.EXPO_PUBLIC_URL_DEMO,
  [Environment.QA]: process.env.EXPO_PUBLIC_URL_QA,
  [Environment.STAGING]: process.env.EXPO_PUBLIC_URL_STAGING,
  [Environment.PRODUCTION]: process.env.EXPO_PUBLIC_URL_PRODUCTION,
  [Environment.DEVELOPMENT]: process.env.EXPO_PUBLIC_URL_DEVELOPMENT,
};

/**
 * Cleartext is tolerated only where the backend is a machine on the desk.
 * Everywhere else an http:// address is a configuration mistake, and one
 * that would otherwise be inherited silently by the WebSocket too.
 */
const allowsCleartext = (environment: Environment): boolean =>
  environment === Environment.DEVELOPMENT;

export function getEnvironmentBaseURL(): string {
  const environment = getAppEnvironment().EXPO_PUBLIC_ENV;
  const baseUrl = URL_BY_ENVIRONMENT[environment];

  if (!baseUrl) {
    throw new Error(
      `No backend URL configured for environment "${environment}". ` +
        `Set EXPO_PUBLIC_URL_${environment.toUpperCase()} in your .env.`
    );
  }

  if (!baseUrl.startsWith("https://") && !allowsCleartext(environment)) {
    throw new Error(
      `The backend URL for "${environment}" must use https:// (got "${baseUrl}").`
    );
  }

  return baseUrl;
}

/**
 * The same address as a WebSocket URL.
 *
 * Derived from the scheme rather than by replacing the leading "http", so a
 * cleartext base can never silently produce a `ws://` socket carrying the
 * bearer token in the open.
 */
export function getWebSocketBaseURL(): string {
  const baseUrl = getEnvironmentBaseURL();

  return baseUrl.startsWith("https://")
    ? `wss://${baseUrl.slice("https://".length)}`
    : `ws://${baseUrl.slice("http://".length)}`;
}
