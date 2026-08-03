// Buvio palette — "La Bulle de Vestiaire" (see DESIGN.md).
// Verde Gramado carries the chrome, Dourado Chopp is the honors color,
// Branco Gelo is the task surface, Preto Grafite is the text.
// Components consume semantic roles only — never hardcode hex in styles.

export type ColorScheme = "light" | "dark";

const dourado = {
  light: "#F8D664",
  main: "#F4C430",
  dark: "#FFB800",
  contrastText: "#1E1E1E",
};

export const lightColors = {
  primary: {
    light: "#0E5C36", // Verde Campo — active fills, links
    main: "#1B4D3E", // Verde Gramado — headers, tab bar
    dark: "#0F3327", // pressed
    contrastText: "#F9F9F9",
  },
  secondary: dourado,
  success: {
    light: "#E3F1E8",
    main: "#1F7A3D",
    dark: "#14572B",
    contrastText: "#F9F9F9",
  },
  error: {
    light: "#FBEAE7",
    main: "#C6402E",
    dark: "#9A2F21",
    contrastText: "#F9F9F9",
  },
  warning: {
    light: "#FCF3D7",
    main: "#A97908",
    dark: "#7C5906",
    contrastText: "#1E1E1E",
  },
  info: {
    light: "#E3EEF7",
    main: "#2C6E9E",
    dark: "#1F4E70",
    contrastText: "#F9F9F9",
  },
  // Green-tinted neutrals — the chalk-and-shade range of the pitch.
  grey: {
    50: "#F4F7F5",
    100: "#E9EEEB",
    200: "#D9E2DD",
    300: "#C2CFC8",
    400: "#9FB0A8",
    500: "#7C8F86",
    600: "#5D7168",
    700: "#46574F",
    800: "#2F3C36",
    900: "#1C2620",
    border: "#D9E2DD",
    disable: "#C2CFC8",
  },
  background: {
    default: "#F9F9F9", // Branco Gelo
    paper: "#FFFFFF",
    dark: "#0B1D15",
  },
  text: {
    primary: "#1E1E1E", // Preto Grafite
    variant: "#2A332E",
    secondary: "#5D7168",
    disabled: "#9FB0A8",
    hint: "#7C8F86",
    lightText: "#F9F9F9",
  },
  calendar: {
    textSectionTitle: "#7C8F86",
    dayText: "#2A332E",
    textDisabled: "#C2CFC8",
  },
  overlay: "rgba(11, 29, 21, 0.55)",
};

// Dark scheme: deep pitch under floodlights — designed, not inverted.
// The grey ramp flips (50 darkest → 900 lightest) so secondary text
// written against grey[600]+ stays legible in both schemes.
export const darkColors: typeof lightColors = {
  primary: {
    light: "#4FA37B",
    main: "#164534",
    dark: "#0C2A1F",
    contrastText: "#F2F5F3",
  },
  secondary: dourado,
  success: {
    light: "#12291E",
    main: "#5DBB7F",
    dark: "#8FD4A8",
    contrastText: "#0B1D15",
  },
  error: {
    light: "#301613",
    main: "#E5715F",
    dark: "#F09A8C",
    contrastText: "#0B1D15",
  },
  warning: {
    light: "#2B2410",
    main: "#E4B93E",
    dark: "#F0D083",
    contrastText: "#0B1D15",
  },
  info: {
    light: "#12222E",
    main: "#6FAAD6",
    dark: "#9CC5E5",
    contrastText: "#0B1D15",
  },
  grey: {
    50: "#13221C",
    100: "#182B23",
    200: "#20362C",
    300: "#2C4437",
    400: "#40584A",
    500: "#5C7365",
    600: "#93A99D",
    700: "#B2C4B9",
    800: "#D0DCD4",
    900: "#EAF0EC",
    border: "#2C4437",
    disable: "#40584A",
  },
  background: {
    default: "#0B1D15",
    paper: "#122A20",
    dark: "#06120D",
  },
  text: {
    primary: "#F2F5F3",
    variant: "#DDE7E1",
    secondary: "#A9BFB4",
    disabled: "#6E857A",
    hint: "#8AA195",
    lightText: "#F9F9F9",
  },
  calendar: {
    textSectionTitle: "#8AA195",
    dayText: "#DDE7E1",
    textDisabled: "#40584A",
  },
  overlay: "rgba(3, 10, 7, 0.65)",
};

export type Palette = typeof lightColors;

export const palette = lightColors;

export default palette;
