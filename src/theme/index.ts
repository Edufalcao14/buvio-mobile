/*
 * Buvio theme — direction contract (see DESIGN.md)
 *
 * THESIS: la troisième mi-temps entre amigos — the locker-room banter as
 * interface. Refuses corporate sports software AND the retro-material museum:
 * modern, chubby, character-led.
 * OWN-WORLD: Verde Gramado (#1B4D3E) chrome; Dourado Chopp (#F4C430) only on
 * the primary action and honors; Branco Gelo ground; Grafite text; bubble
 * geometry (fat radii, pill buttons); Baloo 2 rounded display type; the GOAT
 * mascot as die-cut white-outline sticker owning key moments — his line set
 * as display type, never boxed in a bubble.
 * STORY: joining Buvio feels like walking into the vestiaire — the goat
 * greets you, the group teases you, the one gold action is the next thing
 * the team does together.
 * FIRST VIEWPORT (SignUp): full-green stage; "Alors, on signe où ?" as the
 * Baloo headline (accent word gold) with the goat leaning over the white
 * team sheet that carries the form; gold pill CTA.
 * FORM: direction "La Bulle de Vestiaire", chosen via seed roll c5d4f1f8
 * (index 5) after user steer: modern + humor + mascot; palette owner-pinned.
 */
import {
  lightColors,
  darkColors,
  type ColorScheme,
  type Palette,
} from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

const makeShadows = (colors: Palette) => ({
  // RN shadow objects — always a y-offset with soft blur (no flat halos).
  card: {
    shadowColor: colors.background.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  raised: {
    shadowColor: colors.background.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 8,
  },
});

// Bubble geometry — fat, friendly radii.
const borderRadius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  bubble: 28,
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

export const theme = makeTheme("light");
export const darkTheme = makeTheme("dark");

export type Theme = ReturnType<typeof makeTheme>;

export default theme;
