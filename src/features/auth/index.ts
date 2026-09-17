/**
 * Public API of the auth feature.
 *
 * Other modules import from here and from nowhere else inside `auth/`
 * (docs/ARCHITECTURE.md - "an explicit public API via an index.ts barrel").
 */
export { default as SignInScreen } from "./screens/SignInScreen";
export { default as SignUpScreen } from "./screens/SignUpScreen";
export type { SignedInUser, UserData } from "@/types/auth";
