# ADR 0002 - Codegen reads a vendored schema, not a live endpoint

**Status:** accepted · **Date:** 2026-09-17

## Context

`codegen.ts` pointed at `EXPO_PUBLIC_URL_<ENV>/graphql`, a live introspection
endpoint. In development that resolves to a LAN address on one developer's home
network, so `bun run generate` worked on exactly one machine, on one Wi-Fi, with
the backend running. CI could not run it, which meant nothing could verify that
the committed `src/graphql/generated/` still matched the documents - a backend
change diverged silently until something broke at runtime.

## Decision

The schema is committed at `schema.graphql` and codegen reads that file.
`bun run schema:pull` refreshes it from the backend repository when the
contract changes, and CI regenerates and fails on any diff.

The duplicate `client` preset output was dropped at the same time: it produced
`gql.ts`, `graphql.ts` and `fragment-masking.ts`, roughly 170 KB of generated
source that no application module ever imported.

## Consequences

- The schema is now a reviewable artefact: a contract change shows up as a diff
  in a pull request rather than as a surprise.
- It can go stale. The CI drift check catches a stale _generated_ layer, not a
  stale vendored schema, so `schema:pull` belongs in the backend's release
  routine.
