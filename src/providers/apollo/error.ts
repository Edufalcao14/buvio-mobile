import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { loadAuthState } from "@/utils/auth/secureStore";
import { refreshTokens } from "./refreshToken";
import { parseError, TOKEN_REFRESHABLE_CODES } from "@/lib/errors";
import type { AuthTokens } from "@/types/auth";

/**
 * The link that renews an expired session and replays what failed.
 *
 * Three things here are load-bearing and easy to get wrong:
 *
 * 1. **One refresh at a time.** The in-flight promise is assigned
 *    synchronously, before any `await`, so two operations that expire in the
 *    same tick cannot both start a refresh. Checking a boolean *after* an
 *    await is the classic version of this bug: both callers observe `false`
 *    and race to write the token, and with a rotating refresh token the loser
 *    stores a dead one.
 * 2. **Every waiter gets the new token.** Each operation reads the header off
 *    the resolved token itself, so a queued request is replayed authenticated
 *    rather than replayed with the credential that just failed.
 * 3. **One attempt per operation.** A retried operation is marked, so a server
 *    that keeps answering "expired" cannot drive an endless refresh loop.
 */
const RETRIED = "buvio.tokenRefreshAttempted";

export const createErrorLink = () => {
  /** The refresh in flight, shared by every operation that is waiting. */
  let inFlight: Promise<AuthTokens> | null = null;

  const refreshOnce = (): Promise<AuthTokens> => {
    // Assigned before the first await: this is what makes the guard hold.
    inFlight ??= (async () => {
      const tokens = await loadAuthState();

      if (!tokens?.refreshToken) {
        throw new Error("No refresh token available");
      }

      return refreshTokens(tokens.refreshToken);
    })().finally(() => {
      inFlight = null;
    });

    return inFlight;
  };

  return onError(({ graphQLErrors, operation, forward }) => {
    if (!graphQLErrors) {
      return forward(operation);
    }

    for (const err of graphQLErrors) {
      // The backend reports failures as stable codes in extensions.errorCode.
      // Matching on those instead of on message text means the check no longer
      // breaks when wording changes, and it never misfires on an unrelated
      // error that happens to contain the word "token".
      const { code } = parseError({ graphQLErrors: [err] });

      if (!TOKEN_REFRESHABLE_CODES.has(code)) {
        continue;
      }

      if (operation.getContext()[RETRIED]) {
        // Already renewed once and still refused: the session is genuinely
        // over. Let the error through so the app can sign the user out.
        break;
      }

      return fromPromise(
        refreshOnce().then((tokens) => {
          operation.setContext((previous: Record<string, unknown>) => ({
            ...previous,
            [RETRIED]: true,
            headers: {
              ...(previous.headers as Record<string, string> | undefined),
              authorization: `Bearer ${tokens.accessToken}`,
            },
          }));

          return tokens;
        })
      ).flatMap(() => forward(operation));
    }

    return forward(operation);
  });
};
