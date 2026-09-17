import * as Sentry from "@sentry/react-native";

/**
 * Crash and error reporting.
 *
 * Until this existed, a failure on a user's phone produced nothing at all: no
 * stack, no count, no signal. The team learned about problems when someone
 * complained, and with no over-the-air channel there was no fast way to
 * respond either.
 *
 * Initialisation is conditional on a DSN, so a developer without one runs a
 * completely inert SDK rather than a noisy or failing one.
 */
const DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;

export const isMonitoringEnabled = Boolean(DSN);

export const initMonitoring = (): void => {
  if (!DSN) {
    return;
  }

  Sentry.init({
    dsn: DSN,
    environment: process.env.EXPO_PUBLIC_ENV,
    // Errors only in development; a sampled trace in the field. Full tracing
    // on every session is neither affordable nor useful at this size.
    tracesSampleRate: __DEV__ ? 0 : 0.2,
    // The app handles personal data (emails, nicknames, photographs) and none
    // of it belongs in a crash report.
    sendDefaultPii: false,
    beforeBreadcrumb: (breadcrumb) => {
      // Console breadcrumbs can carry whatever was logged, including values
      // from error payloads. Network breadcrumbs keep the useful shape.
      return breadcrumb.category === "console" ? null : breadcrumb;
    },
  });
};

/**
 * Reports an error that was handled but should still be seen.
 *
 * Every `catch` that shows the user a message and moves on is a place where
 * something went wrong and nobody found out; this is how those become visible.
 */
export const reportError = (error: unknown, context?: string): void => {
  if (!DSN) {
    return;
  }

  Sentry.captureException(error, context ? { tags: { context } } : undefined);
};

/** Ties reports to a user, by id only - never their email or name. */
export const identifyUser = (userId: string | null): void => {
  if (!DSN) {
    return;
  }

  Sentry.setUser(userId ? { id: userId } : null);
};

export { Sentry };
