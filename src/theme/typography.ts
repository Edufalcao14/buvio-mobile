// Buvio type — "Pelouse sous projecteurs": one grotesk superfamily.
//
// Barlow carries body, labels and inputs. Barlow Semi Condensed carries the
// display layer AND every number: condensed so long French names survive a
// tight row, heavy so a score reads from across the bar. Same family, so the
// two never fight.
//
// NEVER pair a `fontWeight` with one of these families — the weight is baked
// into the file name, and a mismatched weight makes iOS synthesize a fake one.
export const typography = {
  fontFamily: {
    regular: "Barlow_400Regular",
    medium: "Barlow_500Medium",
    semiBold: "Barlow_600SemiBold",
    bold: "Barlow_700Bold",
    // Display ladder, heaviest first. Semantic names kept for every consumer.
    display: "BarlowSemiCondensed_700Bold",
    displayBold: "BarlowSemiCondensed_600SemiBold",
    displaySemiBold: "BarlowSemiCondensed_500Medium",
    // Scores, counts, codes, countdowns.
    numeric: "BarlowSemiCondensed_700Bold",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
    display: 48,
  },
  fontWeight: {
    light: "300",
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
    heavy: "800",
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.8,
    // Uppercase micro-labels need air between the caps.
    caps: 1.2,
  },
};

export default typography;
