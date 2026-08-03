const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  {
    ignores: [
      "dist/**",
      ".expo/**",
      "node_modules/**",
      "src/graphql/generated/**",
    ],
  },
  expoConfig,
  prettierConfig,
  {
    rules: {
      // React Compiler diagnostics (eslint-plugin-react-hooks v7)
      "react-hooks/static-components": "error",
      "react-hooks/use-memo": "error",
      "react-hooks/preserve-manual-memoization": "error",
      "react-hooks/incompatible-library": "warn",
      "react-hooks/immutability": "error",
      "react-hooks/globals": "error",
      "react-hooks/refs": "error",
      "react-hooks/set-state-in-effect": "error",
      "react-hooks/error-boundaries": "error",
      "react-hooks/purity": "error",
      "react-hooks/set-state-in-render": "error",
      "react-hooks/unsupported-syntax": "warn",

      // Core rendering — `{value && <X/>}` crashes RN when value is "" or 0
      "react/jsx-no-leaked-render": "error",

      // Keep logs out of production code (Reactotron is available in dev)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Architecture: enforce @/ alias instead of deep relative imports
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../*"],
              message:
                "Use the @/ path alias instead of deep relative imports.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Type safety
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);
