import type { CodegenConfig } from "@graphql-codegen/cli";
import { getEnvironmentBaseURL } from "./utils/environment";
import "dotenv/config";

const config: CodegenConfig = {
  overwrite: true,
  schema: getEnvironmentBaseURL() + "/graphql",
  documents: "./graphql/**/*.graphql", 
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [],
      config: {
        withHooks: true,
      }
    },
    "./graphql/generated/hooks.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      }
    }
  },
};

export default config;