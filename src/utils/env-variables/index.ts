import { z } from "zod";
import { Environment } from "@/types/environment";

/**
 * The runtime configuration, validated once at first read.
 *
 * Zod already validates every form in this app; configuration deserves the
 * same treatment, and for a stronger reason. These values are read lazily deep
 * inside a network call, so a missing or misspelled one used to surface as a
 * failed request against the address `undefined` rather than as a refusal to
 * start. Validating here turns a silent misconfiguration into a loud one.
 *
 * Note that `EXPO_PUBLIC_*` variables are inlined into the shipped bundle by
 * Expo, so nothing secret may ever travel through them - these are addresses,
 * and addresses only.
 */
const schema = z
  .object({
    EXPO_PUBLIC_ENV: z.nativeEnum(Environment, {
      errorMap: () => ({
        message: `EXPO_PUBLIC_ENV must be one of: ${Object.values(Environment).join(", ")}`,
      }),
    }),
    EXPO_PUBLIC_URL_DEMO: z.string().url().optional().or(z.literal("")),
    EXPO_PUBLIC_URL_QA: z.string().url().optional().or(z.literal("")),
    EXPO_PUBLIC_URL_STAGING: z.string().url().optional().or(z.literal("")),
    EXPO_PUBLIC_URL_PRODUCTION: z.string().url().optional().or(z.literal("")),
    EXPO_PUBLIC_URL_DEVELOPMENT: z.string().url().optional().or(z.literal("")),
  })
  .passthrough();

export type AppEnvironment = z.infer<typeof schema>;

let cached: AppEnvironment | null = null;

/** The validated environment. Throws once, with a message that names the fix. */
export const getAppEnvironment = (): AppEnvironment => {
  if (cached) {
    return cached;
  }

  const parsed = schema.safeParse({
    EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV,
    EXPO_PUBLIC_URL_DEMO: process.env.EXPO_PUBLIC_URL_DEMO,
    EXPO_PUBLIC_URL_QA: process.env.EXPO_PUBLIC_URL_QA,
    EXPO_PUBLIC_URL_STAGING: process.env.EXPO_PUBLIC_URL_STAGING,
    EXPO_PUBLIC_URL_PRODUCTION: process.env.EXPO_PUBLIC_URL_PRODUCTION,
    EXPO_PUBLIC_URL_DEVELOPMENT: process.env.EXPO_PUBLIC_URL_DEVELOPMENT,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid environment configuration. Check your .env against .env.example:\n${parsed.error.issues
        .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`
    );
  }

  cached = parsed.data;

  return cached;
};

export const getEnvironmentVariables = (): Environment =>
  getAppEnvironment().EXPO_PUBLIC_ENV;
