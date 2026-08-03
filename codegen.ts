import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

/**
 * The base URL is resolved here rather than imported from `src/utils`: codegen
 * is loaded by graphql-config's own loader, which does not know about the `@/`
 * path alias the app code uses, so importing app modules breaks the config.
 */
const getSchemaBaseURL = () => {
  const environment = process.env.EXPO_PUBLIC_ENV;

  if (!environment) {
    throw new Error("EXPO_PUBLIC_ENV is not set — check your .env file");
  }

  const url =
    process.env[`EXPO_PUBLIC_URL_${environment.toUpperCase()}`];

  if (!url) {
    throw new Error(
      `EXPO_PUBLIC_URL_${environment.toUpperCase()} is not set — check your .env file`
    );
  }

  return url;
};

const config: CodegenConfig = {
  overwrite: true,
  schema: getSchemaBaseURL() + "/graphql",
  documents: "./src/features/**/api/*.graphql",
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      plugins: [],
      config: {
        withHooks: true,
      },
    },
    "./src/graphql/generated/hooks.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

export default config;
