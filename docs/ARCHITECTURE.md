# Buvio Mobile — Architecture

This project uses a **feature-based architecture** combined with the **MVVM pattern** (Model–View–ViewModel) inside each feature. This document explains the structure, the conventions, and how to add new code.

## Overview

```
Buvio-mobile/
├── index.ts                 # Entry point (Reactotron in dev + expo-router/entry)
├── codegen.ts               # GraphQL Code Generator config
├── assets/                  # Images, icons, splash (referenced by app.json)
└── src/
    ├── app/                 # Expo Router routes (thin wrappers only — no logic)
    │   ├── (stacks)/        #   auth + welcome stacks
    │   └── (tabs)/          #   main tab navigation (team, match, ranking)
    ├── features/            # One folder per business domain (see below)
    │   ├── auth/  team/  match/  vote/  settings/  welcome/
    │                        #   each exposes a public API via its index.ts
    ├── components/          # SHARED UI only (used by 2+ features)
    │   ├── avatars/  buttons/  inputs/  container/  indicators/  messaging/  navigation/
    ├── hooks/               # SHARED hooks used by 2+ features (e.g. image upload)
    ├── providers/           # App-level React context (Auth, Theme, Apollo)
    │   └── apollo/          #   Apollo client, error link, token refresh
    ├── graphql/generated/   # Output of GraphQL codegen — never edit by hand
    ├── theme/               # Design tokens: colors, spacing, typography
    ├── types/               # Truly global types (environment, session)
    ├── utils/               # Generic helpers (secure token storage, env)
    └── lib/                 # errors/ (backend code to French copy)
                             # monitoring/ (Sentry + the root error boundary)
```

Two rules are enforced by ESLint rather than left to goodwill: imports use the
`@/` alias instead of deep relative paths, and a feature is reached through its
`index.ts` barrel rather than by reaching into its internals.

Path alias: `@/*` maps to `src/*` (configured in `tsconfig.json`, resolved natively by Expo/Metro). Always import with the alias — never with deep relative paths:

```ts
import { useAuth } from "@/providers/AuthProvider"; // ✅
import { useAuth } from "../../providers/AuthProvider"; // ❌
```

## Anatomy of a feature (MVVM)

Each folder in `src/features/` is a self-contained module for one business domain. Inside, the code is split by MVVM role:

```
features/auth/
├── api/          # MODEL — GraphQL operations (.graphql documents)
├── types/        # MODEL — domain types (User, Me, AuthTokens…)
├── schemas/      # MODEL — Zod validation schemas
├── hooks/        # VIEWMODEL — use<Name>ViewModel hooks
└── screens/      # VIEW — screen components + their .styles.ts
```

### Model

Everything that describes data and business rules, with no knowledge of UI:

- **`api/`** holds the `.graphql` documents. Running `bun run generate` turns them into typed Apollo hooks in `src/graphql/generated/`.
- **`schemas/`** holds Zod schemas used for form validation (and the inferred form types).
- **`types/`** holds the feature's domain types. Other features may import them (e.g. `match` imports `team` types).

### ViewModel

Custom hooks named `use<Screen>ViewModel` (e.g. `useSignInViewModel`). A ViewModel:

- owns all screen state (form state, loading, errors);
- talks to the Model (generated Apollo hooks, providers, stores);
- exposes **ready-to-render data and callbacks** — never Apollo internals;
- contains **zero JSX** and imports nothing from React Native UI.

This is what makes the logic testable: a ViewModel can be tested with `renderHook` without rendering any UI.

### View

Screen components in `screens/`. A View:

- calls its ViewModel and renders what it returns;
- contains no business logic, no navigation decisions, no API calls;
- keeps styles in a sibling `<Screen>.styles.ts` using tokens from `@/theme`.

Feature-local components (used by a single feature, like `match/components/modalCreateMatch`) live inside the feature. Only components reused by 2+ features go to `src/components/`.

## Routing layer (`src/app/`)

Routes are managed by [Expo Router](https://docs.expo.dev/router/introduction/) (file-based). Route files must stay **thin** — they only import and render a screen from a feature:

```tsx
// src/app/(stacks)/auth/signIn.tsx
import SignInScreen from "@/features/auth/screens/SignInScreen";

export default function SignInRoute() {
  return <SignInScreen />;
}
```

This keeps navigation concerns (layouts, stacks, tabs, guards) separate from the screens themselves, and screens stay reusable and testable.

## Data flow

```
View (screen)  ──calls──▶  ViewModel (hook)  ──uses──▶  Model
                                                        ├─ generated Apollo hooks (server state)
                                                        ├─ providers (Auth session, Theme)
                                                        └─ zod schemas (validation)
      ◀──────── plain props: data, flags, callbacks ────┘
```

- **Server state** lives in Apollo Client (cache normalization, refetch). Auth token refresh is handled transparently by the Apollo link chain in `@/providers/apollo`.
- **Session state** (current user, sign in/out) lives in `AuthProvider`.
- **Forms** use `react-hook-form` + `zodResolver`, wired inside the ViewModel.

## Dependency rules

Allowed import directions (a violation of these is a code smell):

| From ↓ may import →           | app          | features                              | components | providers | graphql/generated | theme/utils/types |
| ----------------------------- | ------------ | ------------------------------------- | ---------- | --------- | ----------------- | ----------------- |
| **app** (routes)              | layout files | ✅ screens                            | ✅         | ✅        | —                 | ✅                |
| **features**                  | ❌           | own feature + other features' `types` | ✅         | ✅        | ✅                | ✅                |
| **components** (shared)       | ❌           | ❌                                    | ✅         | ✅        | ❌                | ✅                |
| **providers / utils / theme** | ❌           | ❌                                    | ❌         | ✅        | ✅                | ✅                |

Key points:

- **Shared components must not know about features.** If a shared component needs feature types, that component belongs inside the feature.
- **Features don't import other features' screens or hooks** — only their `types` (and, if needed later, an explicit public API via an `index.ts` barrel).
- **`graphql/generated` is read-only** — regenerate it, never edit it.

## Adding a new feature (checklist)

1. Create `src/features/<name>/` with the folders you need (`screens/` at minimum; add `hooks/`, `schemas/`, `api/`, `types/`, `components/` as required).
2. Write the GraphQL documents in `api/` and run `bun run generate`.
3. Build the ViewModel hook (`hooks/use<Screen>ViewModel.ts`) on top of the generated hooks.
4. Build the View (`screens/<Screen>.tsx` + `<Screen>.styles.ts`) consuming only the ViewModel.
5. Add a thin route file in `src/app/` that renders the screen.
6. Promote a component to `src/components/` only when a **second** feature needs it. The same rule applies to hooks and `src/hooks/`: `useImageUpload` lives there because sign-up and settings both use it, and `PlayerAvatar` moved out of `features/vote/` once the standings needed it too.

## Conventions

- **Naming**: `PascalCase` for screens/components, `use<Name>ViewModel` for ViewModels, `<Name>Validation.ts` for Zod schemas, `<Name>.styles.ts` for styles.
- **Styling**: always consume tokens from `@/theme` (`colors`, `spacing`, `typography`) — no hard-coded values in styles.
- **Types**: feature-specific types live in the feature; only cross-cutting infrastructure types live in `src/types/`.
- **Env vars**: accessed through `@/utils/env-variables` (validated), never `process.env` directly in screens.

## Useful commands

| Command                           | What it does                                           |
| --------------------------------- | ------------------------------------------------------ |
| `bun start`                       | Start the Expo dev server                              |
| `bun run ios` / `bun run android` | Run on simulator/emulator                              |
| `bun run generate`                | Regenerate GraphQL types/hooks from the backend schema |
| `bun run test`                    | Run Jest unit tests (ViewModels + schemas)             |
| `bun run lint`                    | ESLint (includes React Compiler diagnostics)           |
| `bun run typecheck`               | TypeScript check without emitting                      |
