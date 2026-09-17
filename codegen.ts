import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * The schema is the committed `schema.graphql` at the repository root, not a
 * live introspection endpoint.
 *
 * Pointing codegen at a running server meant `bun run generate` only worked on
 * one machine, on one Wi-Fi network, with the backend up - so it could not run
 * in CI and a drift check was impossible. Vendoring the SDL makes generation
 * hermetic and lets CI verify that the committed output still matches.
 *
 * Refresh it with `bun run schema:pull` when the backend contract changes.
 */
const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "./src/features/**/api/*.graphql",
  generates: {
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
