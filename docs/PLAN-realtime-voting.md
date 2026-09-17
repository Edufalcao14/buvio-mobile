# Plan — realtime voting, identity photos, memory, safety net

Decisions were settled in a grilling session; the domain language lives in
`Buvio-Backend/CONTEXT.md` and the architectural calls in
`Buvio-Backend/docs/adr/`. This file is the build order.

Everything ships on `main`, one commit per slice.

## Settled decisions

- Closure is **stored**: `closed_at` + `closed_reason` (`ADMIN | DEADLINE | UNANIMOUS`).
- A **complete Ballot** is a Top _and_ a Flop. `UNANIMOUS` closure applies only
  to rosters of 3+, because a complete Ballot is impossible on a roster of 2.
- Realtime over **graphql-ws subscriptions**, full-state payloads.
- The **Deadline** closure is fired by an **idempotent sweeper**, not a timer.
- **Tally** (live count) is public while open; **Verdict** only on close.
- Images in **Cloudflare R2**, pre-signed upload direct from the app, resized
  on device, confirmed by a mutation.
- **Nickname** rules the social surfaces; `displayName` stays the real name.
- Voting is **two steps**: pick the Top, then the Flop.
- Standings are **two podiums** (most Tops, most Flops), top 3 each.
- History cards carry **state + verdict tags**, from real data only.
- Tests: **RNTL** for screens, **Maestro** for E2E, GitHub Actions for both.

## Image placeholders

No screen may depend on an image existing. Every image resolves through a
fallback chain, and a missing file degrades instead of breaking:

- **Player avatar** → uploaded picture → monogram of the Nickname's initials.
- **Team crest** → uploaded picture → monogram of the Team's initials
  (`TeamCrest`, already built).
- **Verdict art** (`assets/images/buvio_top.png`, `buvio_flop.png`) → the file
  if present → the mascot sticker → a plain gold/grey medallion. These three
  PNGs are currently byte-identical placeholders; the owner will replace them.

Any image that fails to load at runtime falls back the same way, so a dead R2
URL never leaves an empty hole on screen.

## Slice 1 — the ritual

Backend: closure columns and migration; `closeVotingSession` mutation (Admin
only); unanimous detection after each vote; the sweeper; PubSub and the
graphql-ws server; `votingSessionUpdated` subscription carrying status,
participation and Tally, plus the Verdict on the closing event.

App: Apollo split link (WS + HTTP); floating CTA on the Matchs tab when a
session is open and the player's Ballot is incomplete; the two-step vote screen
with Reanimated transitions; the live screen driven by the subscription; the
result screen with confetti for the Top and a consolation for the Flop.

## Slice 2 — identity

Backend: `nickname` and `avatar_key` on users, `crest_key` on teams; R2 client;
`createUploadUrl` and confirm mutations; resolved public URLs on the graph.

App: nickname field at sign-up and in settings; image picker with on-device
resize; avatars everywhere a player appears; team crest in the header.

## Slice 3 — memory

Backend: query for every Vote of a session, with its Comment.

App: history cards with tags; tapping a finished match opens the session detail
with the full Ballot list and comments; standings become the two podiums.

## Slice 4 — safety net

RNTL tests for every screen and its states; Maestro flows for the real journeys
(sign up, create team, create match, vote, see the verdict); GitHub Actions
running lint, typecheck, unit tests and Maestro on an Android emulator, for
both repositories.

## Status (updated as built)

**Slice 1 — the ritual: DONE.** Backend: closure columns, migration and
backfill; `closeVotingSession` restricted to the admin; unanimity detected
after each vote; the idempotent sweeper on a 10s interval; `graphql-ws`
sharing schema, resolvers and auth with the HTTP endpoint; `ballots`, `tally`,
`votes`, `closedAt`, `closedReason` and the `votingSessionUpdated`
subscription. App: the Apollo split link with the token in
`connectionParams`; the floating vote pill on the Matchs tab, which demotes
the create-match FAB to green so only one gold action is ever on screen; the
two-step ballot (Top, Flop, recap) with its optional comments; the live count
driven by the subscription, with the countdown and the admin's "Clore le
vote"; the verdict screen with confetti for the Top and a consolation for the
Flop. `VoteScreen` is one screen with four faces — loading, ballot, live,
result — switched by session state, never by navigation.

**Slice 2 — identity: DONE.** Backend: `users.nickname`, `users.avatar_key`,
`teams.crest_key`, the R2 client, the presigned-upload and confirm mutations,
and `nickname` / `avatarUrl` / `crestUrl` on the graph. App: `useImageUpload`
(pick → resize to 512px → quality ladder under 1 MB → PUT → confirm), the
nickname field at sign-up and in the settings, the avatar picked at sign-up
and uploaded the moment the account exists, the crest picked on create-team
and uploaded once the team has an id, and the crest in the header. Every
picture keeps its monogram fallback, so a missing or dead URL degrades.

**Slice 3 — memory: DONE.** History cards carry their state and verdict tags,
and a match whose vote exists opens its session. The standings are the two
podiums (top 3 per category, players with no votes left off, gold only on the
honours podium). `VoteHistoryScreen` reads every ballot of a closed session,
grouped by the player it was cast for, comments included — lazily queried, so
it costs nothing on the live path.

**Slice 4 — safety net: DONE.** 23 RNTL suites / 108 tests over every screen
and its states, Maestro flows for the real journeys (sign up, sign in, create
a team, join by code, browse the tabs, copy the code, cast a ballot), and CI
running lint, typecheck and tests on both repositories.

## Known gaps

Not defects, but the honest edges of what is built:

- The Maestro job in CI stays **advisory**: it has no APK to install and no
  backend to reach, so it can only prove the flows parse. `vote.yaml` also
  needs a fixture it cannot create (an account that already owes a ballot).
- The **verdict art** (`buvio_top.png`, `buvio_flop.png`) are still
  byte-identical placeholders. They now ship at a sane size, and both fall
  back without breaking, but the Flop still wears the Top's picture until the
  owner supplies the second render.
- The **Matchs tab** is a create-and-vote surface only; the list of matches
  lives on Historique. That is the shipped shape, not an omission.
- **Nobody has reviewed this code but its author.** `CODEOWNERS` and the
  pull-request template are in place; branch protection on `main` is the
  switch that makes them bite, and it is set on the remote, not here.
