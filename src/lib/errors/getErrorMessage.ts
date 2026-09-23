import { ErrorCode, isErrorCode } from "./errorCodes";
import { Locale, MESSAGES, validationMessage } from "./messages";
import { currentLocale } from "@/i18n";

type GraphQLErrorLike = {
  message?: string;
  extensions?: {
    errorCode?: unknown;
    details?: { field?: unknown; rule?: unknown } | null;
  } | null;
};

type ApolloErrorLike = {
  graphQLErrors?: readonly GraphQLErrorLike[];
  networkError?: unknown;
  message?: string;
};

export type ParsedError = {
  code: ErrorCode;
  field?: string;
  rule?: string;
};

/**
 * Reads the backend's error code out of an Apollo error.
 *
 * The backend puts it in `extensions.errorCode` and repeats it as the message,
 * so both are checked. Anything unrecognised — a network failure, a proxy error
 * page, a code this build predates — becomes INTERNAL_ERROR, which is the one
 * message that always makes sense.
 */
export const parseError = (error: unknown): ParsedError => {
  const apolloError = error as ApolloErrorLike | undefined;
  const graphQLError = apolloError?.graphQLErrors?.[0];

  const candidate =
    graphQLError?.extensions?.errorCode ??
    graphQLError?.message ??
    (error as GraphQLErrorLike | undefined)?.extensions?.errorCode ??
    apolloError?.message;

  if (!isErrorCode(candidate)) {
    return { code: "INTERNAL_ERROR" };
  }

  const details =
    graphQLError?.extensions?.details ??
    (error as GraphQLErrorLike | undefined)?.extensions?.details;

  return {
    code: candidate,
    field: typeof details?.field === "string" ? details.field : undefined,
    rule: typeof details?.rule === "string" ? details.rule : undefined,
  };
};

/**
 * The message to show the user for a failed request, in the app's current
 * locale (English by default, French when the device asks for it).
 */
export const getErrorMessage = (
  error: unknown,
  locale: Locale = currentLocale()
): string => {
  const { code, field } = parseError(error);

  if (code === "VALIDATION_FAILED") {
    const perField = validationMessage(locale, field);
    if (perField) {
      return perField;
    }
  }

  return MESSAGES[locale][code];
};
