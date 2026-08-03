/**
 * Mirrors ErrorMessageCode in the backend
 * (Buvio-Backend/src/entities/errors/error-message-code.ts).
 *
 * The backend never sends user-facing prose: every failure arrives as
 * `extensions.errorCode`, and this app owns the wording in each language. Keep
 * this list in sync when the backend adds a code — an unknown code falls back to
 * a generic message rather than breaking, but the user sees something vague.
 */
export const ERROR_CODES = [
  // Authentication and session
  "AUTH_REQUIRED",
  "AUTH_ACCOUNT_DISABLED",
  "AUTH_INVALID_CREDENTIALS",
  "AUTH_EMAIL_NOT_VERIFIED",
  "AUTH_TOKEN_INVALID",
  "AUTH_TOKEN_EXPIRED",
  "AUTH_TOKEN_REVOKED",
  "AUTH_REFRESH_TOKEN_INVALID",
  "AUTH_REFRESH_TOKEN_MISSING",
  "AUTH_ADMIN_REQUIRED",
  "AUTH_ALREADY_IMPERSONATING",
  "AUTH_NOT_IMPERSONATING",
  "AUTH_RATE_LIMITED",

  // Users
  "USER_NOT_FOUND",
  "USER_EMAIL_ALREADY_EXISTS",
  "USER_ALREADY_IN_TEAM",
  "USER_NOT_IN_TEAM",

  // Teams
  "TEAM_NOT_FOUND",
  "TEAM_ACCESS_DENIED",
  "TEAM_CODE_NOT_FOUND",
  "TEAM_CODE_TAKEN",
  "TEAM_CODE_GENERATION_FAILED",

  // Matches
  "MATCH_NOT_FOUND",

  // Voting sessions
  "VOTING_SESSION_NOT_FOUND",
  "VOTING_SESSION_ALREADY_EXISTS",
  "VOTING_SESSION_CLOSED",

  // Votes
  "VOTE_NOT_FOUND",
  "VOTE_ALREADY_CAST_FOR_TYPE",
  "VOTE_SAME_PLAYER_TOP_AND_FLOP",
  "VOTE_SELF_NOT_ALLOWED",
  "VOTE_PLAYER_NOT_IN_MATCH",

  // Request-level
  "VALIDATION_FAILED",
  "REQUEST_INVALID",
  "QUERY_TOO_COMPLEX",
  "INTERNAL_ERROR",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

const ERROR_CODE_SET = new Set<string>(ERROR_CODES);

export const isErrorCode = (value: unknown): value is ErrorCode =>
  typeof value === "string" && ERROR_CODE_SET.has(value);

/**
 * Codes that mean "this access token will not work again as it is". The Apollo
 * error link retries these once with a refreshed token.
 */
export const TOKEN_REFRESHABLE_CODES: ReadonlySet<ErrorCode> = new Set([
  "AUTH_TOKEN_EXPIRED",
  "AUTH_TOKEN_REVOKED",
  "AUTH_TOKEN_INVALID",
]);

/**
 * Codes that mean the session is over and a refresh will not help: the user has
 * to sign in again.
 */
export const SESSION_ENDED_CODES: ReadonlySet<ErrorCode> = new Set([
  "AUTH_REFRESH_TOKEN_INVALID",
  "AUTH_REFRESH_TOKEN_MISSING",
  "AUTH_ACCOUNT_DISABLED",
]);
