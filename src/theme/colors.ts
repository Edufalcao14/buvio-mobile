// Buvio palette — "Pelouse sous projecteurs" (see DESIGN.md).
//
// Dark-first and dark-locked: the app reads like a live scoreboard. A neutral
// near-black ground, one accent that means "act" (Dourado) and one that means
// "alive / positive" (Verde Vif). Components consume semantic roles only —
// never hardcode hex in styles.
//
// The scheme type is kept so `makeTheme` keeps its signature, but both schemes
// resolve to the same palette: a scoreboard has no light mode.

export type ColorScheme = "light" | "dark";

const dourado = {
  light: "#F8D664",
  main: "#F4C430",
  dark: "#D9A916",
  contrastText: "#0A0C0B",
};

export const darkColors = {
  // Verde Vif — live state, positive, focus. Never a background surface.
  primary: {
    light: "#4FC98A", // text-safe on the dark ground
    main: "#2FA968",
    dark: "#1F7A4C", // pressed
    contrastText: "#0A0C0B",
  },
  secondary: dourado,
  success: {
    light: "#0F2A1C",
    main: "#2FA968",
    dark: "#4FC98A",
    contrastText: "#0A0C0B",
  },
  error: {
    light: "#2A1414",
    main: "#FF5C5C",
    dark: "#FF8A8A",
    contrastText: "#0A0C0B",
  },
  warning: {
    light: "#2A2012",
    main: "#F0A33A",
    dark: "#F5BC6A",
    contrastText: "#0A0C0B",
  },
  info: {
    light: "#10202E",
    main: "#5AA9FF",
    dark: "#8CC4FF",
    contrastText: "#0A0C0B",
  },
  // Neutral ramp with a whisper of green, 50 darkest → 900 lightest, so the
  // low end is a surface and the high end is text.
  grey: {
    50: "#0F1210",
    100: "#161A18",
    200: "#1F2522",
    300: "#2A322E",
    400: "#3A443F",
    500: "#55615B",
    600: "#7A877F",
    700: "#9AA69F",
    800: "#C2CBC6",
    900: "#E6EBE8",
    border: "#232A26",
    disable: "#2A322E",
  },
  background: {
    default: "#0A0C0B", // the ground
    paper: "#121614", // cards, inputs, sheets
    elevated: "#1A201C", // modals, menus, anything floating over paper
    dark: "#050706", // deepest — overlays, shadow tint
  },
  text: {
    primary: "#F4F6F5",
    variant: "#DDE3E0",
    secondary: "#8A9691",
    disabled: "#55615B",
    hint: "#6E7A74",
    lightText: "#F4F6F5",
  },
  calendar: {
    textSectionTitle: "#6E7A74",
    dayText: "#DDE3E0",
    textDisabled: "#3A443F",
  },
  overlay: "rgba(0, 0, 0, 0.72)",
};

export type Palette = typeof darkColors;

// Dark-locked (see file header). Kept as a named export so the provider's
// scheme branch and any existing import keep compiling.
export const lightColors: Palette = darkColors;

export const palette = darkColors;

export default palette;
