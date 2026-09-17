# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

> Buvio ships as one React Native (Expo) app on iOS and Android with a **single brand identity across both platforms** (confirmed by the owner). Native affordances (navigation gestures, safe areas, system controls) are respected per OS, but the visual language does not fork into HIG-vs-Material variants.

## Users

Primary users are **groups of amateur/recreational football players** ("pelada" groups of friends). They organize matches within their team, play, and afterwards vote for the MVP and follow the team ranking. The app is used casually, socially, often around the post-game gathering ("resenha", typically with beer).

Secondary role: the group member who administers the team (creates the team, shares the join code, creates matches).

## Product Purpose

Buvio turns loose recreational football games into a shared team ritual: create or join a team, schedule matches, and after each match vote for the MVP and watch the team ranking evolve. Success means the group keeps coming back after every match to vote and check the ranking.

## Positioning

The heart of Buvio is the **post-game ritual — MVP voting and the "resenha"** — not team logistics. Football + chopp (draft beer) is the identity: competitors do scheduling; Buvio owns the social moment after the whistle. (Confirmed by the owner.)

## Operating Context

- Used on personal phones, frequently right after a match (outdoors, possibly bright light, one-handed, distracted context).
- Team-based: users join a team via code or create one; matches, votes, and rankings live inside the team.
- Backend is a GraphQL API (Apollo Client, codegen); auth with sign-in/sign-up and token refresh.

## Capabilities and Constraints

Confirmed functionality in the codebase:

- Auth: sign in / sign up flows (react-hook-form + Zod validation).
- Welcome flow: create a team or join a team (join code input).
- Team tab area with three surfaces: Team, Match (incl. match creation with date picker and match history), Ranking.
- Toasts for messaging; loading screen indicator.

Technical constraints:

- Expo 53 / React Native 0.79, Expo Router (file-based routes stay thin), TypeScript strict.
- Feature-based + MVVM architecture (`docs/ARCHITECTURE.md`): screens keep styles in sibling `.styles.ts` files consuming tokens from `@/theme`; ViewModels contain no JSX.
- Server state in Apollo; generated GraphQL code in `src/graphql/generated` is never hand-edited.
- Design tokens live in `src/theme/` (colors, spacing, typography) — the single source of visual truth for styles.

Undecided product facts: monetization, notifications, and stats beyond ranking are not established — do not invent them.

## Brand Commitments

- Name: **Buvio**.
- Identity: football (grass, field, tradition) + chopp/beer (the post-game resenha).
- **La troisième mi-temps** (owner, 2026-08-03): the app's soul is the Belgian
  "third half" — the post-match gathering at the club's buvette, relaxed and
  playful among friends. Carried by **modern, character-led design** (owner
  steer, same date: modern + humor + mascot; retro material-culture renditions
  were explicitly rejected). Never corporate sports software, never a museum.
- Binding palette set by the owner (2026-08-03), replacing the previous orange/purple theme:
  - **Verde Gramado** (primary): #1B4D3E or #0E5C36 — sport, field, football tradition; suited to navigation bars and main backgrounds (especially dark mode).
  - **Dourado Chopp** (secondary/accent): #F4C430 or #FFB800 — beer/foam tone; for primary "Vote" actions, the MVP badge, and key CTAs.
  - **Branco Gelo** (background/neutral): #F9F9F9 — breathing room and clarity.
  - **Preto Grafite** (text/details): #1E1E1E — crisp, comfortable text.
- The app must support **light and dark modes** (confirmed).

## Evidence on Hand

- Existing app icon/splash in `assets/` (icon recently modified; treat current brand assets as in flux).
- No testimonials, user counts, or press on hand — never fabricate social proof.

## Product Principles

1. **The ritual over the record.** Voting MVP and the post-game moment are the product's heart; logistics exist to feed that ritual.
2. **Zero friction for casual groups.** Join by code, vote in seconds — anything that feels like admin software kills the resenha mood.
3. **Playful, not childish.** Football + beer culture with wit and warmth, while keeping votes and rankings legible and trustworthy.
4. **One brand, two platforms.** The same Buvio identity everywhere; respect native affordances without forking the visual language.
5. **Truthful competition.** Rankings and MVP results are real group data — present them clearly, never embellish or invent stats.

## Accessibility & Inclusion

No product-specific standard established. Baseline expectation: legible contrast in outdoor/bright conditions and comfortable one-handed use, given the post-match usage scene.
