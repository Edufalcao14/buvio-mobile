# Buvio — Design System

<!-- World v2 "La Bulle de Vestiaire" (2026-08-03), replacing v1 "Clube de
Várzea" after owner steer: modern + humor + mascot-led. Palette unchanged
(owner-pinned). The retro-material renditions (chalk, enamel, kicker) are
anti-reference. -->

## World: "La Bulle de Vestiaire"

Buvio is la troisième mi-temps made app: the locker-room/group-chat banter
between friends after the whistle. The interface speaks it with **bubble
geometry** (fat radii, pill buttons, speech-bubble cards), **rounded chubby
display type** (Baloo 2), and the **goat mascot as a die-cut sticker** —
white outline, slapped slightly askew — who comments the key moments. Modern
and fresh (Duolingo/Discord energy), never retro, never corporate.

Mode: **Operate**. The humor frames the task, never blocks it: forms,
rankings, and votes stay instantly scannable.

## Color tokens (`src/theme/colors.ts`) — unchanged, owner-pinned

| Role                                                      | Light     | Dark      |
| --------------------------------------------------------- | --------- | --------- |
| `primary.main` (Verde Gramado — chrome)                   | `#1B4D3E` | `#164534` |
| `primary.light` (Verde Campo — active, links, focus)      | `#0E5C36` | `#4FA37B` |
| `secondary.main` (Dourado Chopp — primary action, honors) | `#F4C430` | `#F4C430` |
| `background.default` (Branco Gelo / deep pitch)           | `#F9F9F9` | `#0B1D15` |
| `background.paper` (bubbles, cards, inputs)               | `#FFFFFF` | `#122A20` |
| `text.primary` (Grafite / ice)                            | `#1E1E1E` | `#F2F5F3` |
| `text.secondary` (green-tinted)                           | `#5D7168` | `#A9BFB4` |

Gold discipline holds: one gold action per screen, plus MVP/honors. Text on
gold is always Grafite; text on green is always Ice.

## Signature: the vestiaire stage + the goat's line as headline

`assets/images/sticker_goat.png` (die-cut, white outline) — **synthetic
placeholder**: generated from the current 3D mascot render; replace with the
final flat character art when it exists.

Two devices, no speech-bubble chrome (the boxed bubble was rejected):

1. **The stage (auth + entry surfaces):** Verde Gramado owns the whole
   screen; the goat leans large over the edge of a Branco Gelo "team sheet"
   (32px top radius) that carries the task; his line IS the headline — Baloo
   display in Ice with one accent word in Dourado (`AuthHero`).
2. **Mascot moments (empty states, celebrations):** sticker tilted ~-4° with
   the line set directly in Baloo display (`MascotBubble` component).

His lines are short French banter (light teasing, never mean, never blocking
info) — he greets on auth, cheers on success, mopes on empty states, raises
the mug on MVP. One mascot appearance per screen at most. New poses must
keep the die-cut white outline (~16px at 1200w) and be labeled synthetic
until final art arrives.

## Typography (`src/theme/typography.ts`)

- **Display: Baloo 2** (`Baloo2_800ExtraBold` titles/wordmark,
  `Baloo2_700Bold` buttons, `Baloo2_600SemiBold` accents). NEVER pair a
  `fontWeight` with a Baloo `fontFamily` — the weight is baked in.
- **Body/labels/inputs: system faces** — Operate legibility.
- Scale: `xs 12 · sm 14 · md 16 · lg 18 · xl 22 · xxl 28 · xxxl 34`.
- Titles: `xxl` Baloo ExtraBold, `text.primary`.

## Geometry & elevation

- Radii: `sm 8 · md 12 · lg 18 · xl 24 · bubble 28 · round`. Buttons are
  pills (`round`); cards and speech bubbles use `bubble`; inputs `xl`.
- The team sheet: `background.default` surface with 32px top radius rising
  over the green stage (auth/entry screens).
- Shadows via `theme.shadows` (card/raised) — soft, y-offset, green-tinted.

## Components

- **Button**: pill, min 52pt; `primary` gold with Grafite Baloo Bold label;
  `secondary` green/ice. Pressed = `dark` tone + scale 0.98.
- **MascotBubble**: the signature; props `line` (the goat's text) and
  `size`. One per screen.
- **Inputs**: paper, 1.5px `grey.border`, radius `xl`, focus border Verde
  Campo, 52pt min height.
- **Header**: green chrome, Baloo wordmark, circular crest, 3px gold club
  stripe at the bottom edge (omitted when tabs continue the chrome).
- **Tabs**: green bar, gold indicator, ice labels.
- **Toast**: paper bubble + status dot (no fat colored borders).
- **Header** (team area): the club owns the bar — monogram `TeamCrest`,
  team name in Baloo, and the invite code as a translucent pill that copies
  on tap and shares on long press, with a settings button on the right.
  The crest is a monogram until teams can upload their own badge.
- **Podiums** (`team/components/podium`): the standings are two cards, most
  Tops and most Flops, three players each with medal emoji. Players with no
  votes are left off — a podium is for those the squad actually voted for.
  Your own row is outlined in Verde Campo, never filled, so it cannot outrank
  the leader. Gold tints only the honours podium's counts.
- **Settings**: card sections on Branco Gelo; the invite code lives here in
  full size with Copier / Partager actions, and sign-out is an outlined
  destructive pill.
- **Match card** (`MatchHistoryCard`): paper bubble; a date block anchors the
  row, then the match name in Baloo Bold over a wrapping row of tags. It
  becomes a button only when given somewhere to go.
- **Tag** (`matchHistoryCard/Tag`): the only place a chip is styled, with
  three variants. `honours` is the sole gold bearer — the crown pill
  `👑 <name>` is the MVP medallion in chip form. `live` borrows the error
  colour so a running vote reads as urgent without stealing the gold.
  `neutral` is everything else, including the flop: the roast is
  affectionate, so it never gets a colour of its own. Gold is never a
  fallback — a tag has to ask for `honours` to get it.
- **Pending verdicts**: a match whose vote has not been started, is still
  running, or drew no votes says so in italic secondary text. Never fake a
  result, and never leave the state blank.

## Copy voice

French, first-person club banter: short, warm, lightly teasing ("Alors, on
signe où ?"). Factual copy (labels, errors, legal) stays plain and precise —
humor lives in the mascot's bubble and empty states only. Errors name the
problem and the fix, without jokes.

## Accessibility floor

Contrast ≥ 4.5:1 both schemes; touch targets ≥ 44/48pt; the mascot bubble is
decorative-plus-text (accessible label = its line); humor never replaces
state information.
