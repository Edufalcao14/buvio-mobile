# Maestro E2E flows

End-to-end journeys through the real app: sign up, sign in, create a team,
join a team by code, browse the three team tabs, copy the invitation code from
the settings screen, and cast a ballot on an open vote.

## What you need

Maestro drives an **installed app** — it cannot build or bundle one. Before
running anything:

1. **A dev build on a running simulator/emulator or device**
   ```bash
   bun run ios      # or: bun run android
   ```
   The bundle id the flows target is `com.anonymous.BuvioFrontend`.
2. **A reachable backend**, since every flow signs in or signs up for real.
   Start `Buvio-Backend` (`bun run start:dev`) and point the app at it through
   `.env` (`EXPO_PUBLIC_URL_DEVELOPMENT`).
3. **Maestro**
   ```bash
   curl -fsSL "https://get.maestro.mobile.dev" | bash
   ```

## Running

```bash
maestro test .maestro                      # every journey
maestro test .maestro/sign-in.yaml         # a single journey
maestro studio                             # interactive selector explorer
```

Flows that need real data take environment variables:

```bash
# an account that already belongs to a team
maestro test .maestro -e EMAIL=you@buvio.test -e PASSWORD='Buvio2026!secret'

# an existing team's 5 character invitation code
maestro test .maestro/join-team.yaml -e TEAM_CODE=AB12C

# an account that still owes a ballot, and two squad names on the sheet
maestro test .maestro/vote.yaml \
  -e EMAIL=you@buvio.test -e PASSWORD='Buvio2026!secret' \
  -e TOP_PLAYER=Sofiane -e FLOP_PLAYER=Karim
```

`vote.yaml` is the one journey that cannot build its own fixture: a ballot
needs an _open_ voting session, and opening one is an admin act on a match
that already exists. Point it at an account whose vote is still pending —
the flow fails on the missing "Voter" pill rather than passing silently.

`sign-up.yaml` and `create-team.yaml` generate a unique email and team name on
each run, so they need no setup beyond a running backend.

## Layout

| File                      | Journey                                                      |
| ------------------------- | ------------------------------------------------------------ |
| `sign-up.yaml`            | New account, up to the welcome fork                          |
| `sign-in.yaml`            | Existing account into the team tabs, plus a refused login    |
| `create-team.yaml`        | New account creating its own club                            |
| `join-team.yaml`          | New account joining a club with a code                       |
| `browse-tabs.yaml`        | Matchs / Historique / Classement, and the match modal        |
| `settings-copy-code.yaml` | Settings, invitation code, copy                              |
| `vote.yaml`               | The two-step ballot, from the CTA to the live count          |
| `subflows/`               | Reusable pieces called with `runFlow` (not run on their own) |

`config.yaml` limits `maestro test .maestro` to the top-level flows so the
subflows are not executed as journeys.

## Selectors

Flows prefer the French text and accessibility labels the app already exposes.
The only `testID`s they rely on are the form fields — `input-<field name>`
(e.g. `input-email`, `input-password`, `input-name`) and the five code boxes
`code-input-0` … `code-input-4`.
