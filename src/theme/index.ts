/*
 * Buvio theme — direction contract (see DESIGN.md)
 *
 * THESIS: la troisième mi-temps, read like a live scoreboard. The app is the
 * data surface of an amateur team — who played, who voted, who won the night —
 * and it borrows its posture from the sports-data category (Sofascore, bet365,
 * DAZN): dark ground, condensed numerals, one accent that means "act".
 * OWN-WORLD: near-black ground; Dourado (#F4C430) only on the primary action
 * and honours; Verde Vif (#2FA968) only for live state and positive; hairline
 * borders instead of shadows; tight radii; Barlow superfamily. The goat mascot
 * is demoted to an accent: empty states and the verdict, never the chrome.
 * STORY: opening Buvio after the match feels like checking the score.
 * FIRST VIEWPORT (SignIn): flat dark canvas, wordmark, one form, one gold CTA.
 * FORM: direction "Pelouse sous projecteurs", owner steer 2026-09-18:
 * minimalist, modern, sports-data aesthetic; palette equity kept, mascot
 * demoted.
 */
import {
  lightColors,
  darkColors,
  type ColorScheme,
  type Palette,
} from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

// On a near-black ground a drop shadow is invisible; depth is carried by the
// surface step (default → paper → elevated) and a hairline border. `card` is
// therefore flat, and `raised` is reserved for things that truly float
// (FAB, floating pills) where a soft halo separates them from busy content.
const makeShadows = (colors: Palette) => ({
  card: {
    shadowColor: colors.background.dark,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  raised: {
    shadowColor: colors.background.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 10,
  },
});

// Tight, consistent geometry: one scale for the whole app. `bubble` is kept as
// an alias of `xl` so every former consumer compiles; the sweep replaces it.
const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  bubble: 18,
  round: 9999,
};

export const makeTheme = (scheme: ColorScheme) => {
  const colors = scheme === "dark" ? darkColors : lightColors;
  return {
    scheme,
    colors,
    spacing,
    typography,
    shadows: makeShadows(colors),
    borderRadius,
  };
};

export const theme = makeTheme("dark");
export const darkTheme = makeTheme("dark");

export type Theme = ReturnType<typeof makeTheme>;

export default theme;
