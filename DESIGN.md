# Buvio — Design System

<!-- World v3 "Pelouse sous projecteurs" (2026-09-18), replacing v2 "La Bulle
de Vestiaire" after owner steer: minimalist, modern, sports-data aesthetic
(Sofascore / bet365 / DAZN family). Palette equity kept (green + gold),
rebuilt dark-first. Mascot demoted from headline to accent. -->

## World: "Pelouse sous projecteurs"

Buvio reads like a live scoreboard. It is the data surface of an amateur
team — who played, who voted, who won the night — and it borrows its posture
from the sports-data category: **near-black ground**, **condensed numerals**,
**hairline borders instead of shadows**, one accent that means _act_
(Dourado) and one that means _alive / positive_ (Verde Vif).

Mode: **Operate**. Every screen is scannable in one glance; the primary
action sits in the bottom third, reachable by thumb; at most two taps from
the team home to any action.

Anti-references: bubble geometry, fat radii, the green header bar, the gold
stripe, sticker-tilted mascot, emoji in labels, drop shadows on cards.

## Color tokens (`src/theme/colors.ts`) — dark-locked

There is no light scheme. `makeTheme("light")` resolves to the same palette so
existing call sites keep compiling.

| Role                          | Hex                   | Use                                       |
| ----------------------------- | --------------------- | ----------------------------------------- |
| `background.default`          | `#0A0C0B`             | the ground                                |
| `background.paper`            | `#121614`             | cards, inputs, sheets                     |
| `background.elevated`         | `#1A201C`             | modals, menus, floating strips            |
| `grey.border`                 | `#232A26`             | every hairline                            |
| `secondary.main` (Dourado)    | `#F4C430`             | the one primary action + honours (Top #1) |
| `primary.main` (Verde Vif)    | `#2FA968`             | live state, selected, positive            |
| `primary.light`               | `#4FC98A`             | Verde Vif as text / icon on the ground    |
| `success.light`               | `#0F2A1C`             | tint behind a live / selected element     |
| `text.primary` / `.secondary` | `#F4F6F5` / `#8A9691` |                                           |
| `error.main`                  | `#FF5C5C`             | destructive, validation                   |

**Gold discipline holds:** one gold action per screen, plus the Top honours.
Text on gold is always `#0A0C0B`. Green is never a surface — it is a state.

## Typography (`src/theme/typography.ts`) — one grotesk superfamily

- **Barlow** carries body, labels, inputs (`regular / medium / semiBold /
bold`).
- **Barlow Semi Condensed** carries the display layer AND every number
  (`display` 700 / `displayBold` 600 / `displaySemiBold` 500 / `numeric` 700).
  Condensed so long French names survive a tight row; heavy so a score reads
  across the bar — the Sofascore principle.
- **NEVER pair a `fontWeight` with one of these families.** Weight is in the
  file name; a mismatch makes iOS synthesize a fake one.
- Micro-labels above fields and sections: `semiBold`, `fontSize.xs`,
  `letterSpacing.caps`, `textTransform: "uppercase"`, `text.secondary`.

## Geometry (`src/theme/index.ts`)

- Radii: `sm 6 / md 10 / lg 14 / xl 18 / round`. Inputs and buttons `md`,
  cards `lg`, chips `sm`, avatars `round`. `bubble` is an alias of `xl` kept
  for compilation; do not use it in new code.
- Depth is the surface step (default → paper → elevated) plus a 1px
  `grey.border`. `shadows.card` is flat by design. `shadows.raised` exists only
  for things that truly float (FAB, floating pills, toasts).

## Chrome

- Header, top tabs, modal headers and the vote top bar are all **flat on
  `background.default` with a bottom hairline**. No colored bar anywhere.
- Top tabs: active label `text.primary`, inactive `text.secondary`, **2pt gold
  underline**. Never a percentage-height indicator (it measures padding and
  overflows).
- Buttons: `primary` gold / `secondary` paper + border / `ghost` transparent.
  Label is `displayBold`, uppercase, `letterSpacing.wide`.

## The mascot — accent, not headline

`assets/images/sticker_goat.png` and `coach_goat_white.png` appear in exactly
two places: **empty states** and **the verdict**. Straight (no tilt), small
(`MascotBubble` `sm`/`md`), his line in `displayBold` `text.variant`. He is
gone from auth, welcome, the header, and every data screen. One appearance per
screen, still.

## Data patterns

- **Scoreboard tiles** (`History` summary): big `numeric` value, caps label
  below, hairline dividers between tiles.
- **Fixture row** (`MatchHistoryCard`): 48pt date column (`numeric` day, caps
  month), then name + chips + player count.
- **Standings** (`PodiumCard`): rank number column, avatar, name, `numeric`
  count; gold count on the Top podium, neutral on the Flop.
- **Chips** (`Tag`): `sm` radius, caps, text prefix instead of emoji
  (`Top Camille`, `Flop Sacha`, `Vote en cours`). Live is Verde Vif on
  `success.light`; honours is gold; everything else neutral.
- **Meters** (`TallyRow`): 6pt bars, gold for Top, `grey[500]` for Flop, on a
  `grey[200]` track.

## Copy voice

English first (see below); the French keeps the original locker-room voice.

French, second person singular, short. No emoji in UI strings — the chip
variant or the section carries the meaning. The goat's banter survives only
in his two slots.

## Motion (`src/components/motion/`)

Every animation passes the frequency gate first: things touched a hundred
times a day (tab switches, keyboard) do not animate; press feedback is under
150ms; the delight budget is spent only on the verdict.

- **`PressableScale`** — every tappable surface: scale 0.97 in 120ms as a
  Reanimated CSS transition (UI thread, no shared value). Optional
  `selectionAsync` on press-in.
- **`StaggerItem`** — `FadeInDown` 260ms, 40ms per sibling, for content the
  player waited on (standings, verdict, tally). Never on a virtualized row.
- **`AnimatedNumber`** — scoreboard values count up once via
  `useAnimatedProps` on a read-only TextInput. Tests read `getByDisplayValue`.
- **`ProgressRing`** — SVG ring whose dash offset is the one animated
  property; ballots cast on the live vote.
- **`Skeleton` / `ListSkeleton`** — CSS keyframe pulse, shaped like the
  content. Replaces every first-load spinner.
- **Haptics** (`haptics.ts`) — one per user action, always with a visual:
  `tapSelection` picking a candidate or a segment, `tapImpact` on the primary
  button and on copying the code, `notifySuccess` once when the verdict lands.
- Reduced motion: translations and count-ups collapse to fades and final
  values; the stack transition becomes `fade`.
- Native pieces over rebuilt ones: `UISegmentedControl` for the match type,
  the platform push for screens, `RefreshControl` for pull to refresh.

## Gamification (`src/features/team/gamification.ts`)

- **Trophy tiers** on Top counts: Bronze 1, Argent 3, Or 5. Shown as a chip
  on the Top podium rows and on the "Ma saison" card, with the gap to the
  next tier always visible (the Nike Run Club rule: first win reachable on
  night one, the season goal never out of sight).
- **"Ma saison"** (Ranking): my place in the Top race, tops, flops, tier.
- **Streak** (History): the same player crowned Top on ≥ 2 consecutive
  decided nights, as a strip under the scoreboard. Undecided nights do not
  break it; a no-vote night does.

## Copy and locales (`src/i18n/`)

- **English is the default.** French is served only when the device language
  is French; anything else falls back to English key by key (`i18n-js`,
  `enableFallback`).
- Every user-facing string goes through `t("feature.key")` from `@/i18n`;
  `en.ts` is the source of truth and `fr.ts` is typed against it, so a key
  missing in one locale is a compile error. Backend error codes resolve
  through `lib/errors` in the same locale.
- Plurals use `one`/`other` with `count`; interpolations use `%{name}`.
- Dates follow the app locale (date-fns `enUS`/`fr`, calendar Monday-first).
- Tests run in the shipped default, English (`expo-localization` is mocked).

## Signature screens (v3.1, 2026-09-20)

- **Team hero** (`Header` with `showTeamActions`): crest 56, name in
  display type that shrinks rather than truncates, sport + invite code pill.
- **Matches tab** = "now and next": `LiveVoteBanner` (Verde Vif surface,
  `LiveDot`, gold CTA) when the player owes a vote, then upcoming fixtures.
- **Fixture card**: type/state chips, and once decided a **verdict spotlight**
  — gold spot with the `GoatIcon` (the GOAT) for the Top, neutral spot with
  `trending-down` for the Flop, both with the player's monogram.
- **Standings**: `Podium` (2 · 1 · 3, first under a gold `Glow`, counts on the
  steps, tier under the name), "Ma saison", then the Flop list.
- **Create match**: display-type name on a hairline, native segmented control
  (active = gold), `DateChips` (Today + weekdays + calendar; selected = gold),
  roster as `AvatarStack`, gold CTA pinned.
- **Ballot**: two-segment progress bar, candidates as a 2-column grid of
  faces, check lands top-right.
- **Live vote**: 72pt clock under a green glow with `LiveDot`, ballots ring +
  faces (green ring = voted), tally.
- **Verdict**: winner face at 104 in a gold ring under a 320 glow, name in
  display; Flop as a quiet card; final tally; confetti + success haptic once.
- Selected/active state is **always the gold**: segments, date chips, the one
  CTA. Verde Vif is reserved for _live_.
