import React, { useState } from "react";
import { View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./VerdictArt.styles";

/**
 * The verdict art placeholders are owner-supplied and may be replaced or
 * deleted at any time, so every `require` is attempted rather than assumed:
 * a missing file must degrade, never break the bundle.
 */
const tryRequire = (loader: () => ImageSource): ImageSource | null => {
  try {
    return loader();
  } catch {
    return null;
  }
};

// The dedicated verdict renders (`buvio_top.png` / `buvio_flop.png`) ship on a
// white plate and read as a cropped rectangle on the dark ground, so they are
// out of the chain. The die-cut sticker is the one piece of mascot art that
// survives on any surface.
const STICKER = tryRequire(() =>
  require("../../../../assets/images/sticker_goat.png")
);

interface VerdictArtProps {
  variant: "top" | "flop";
  size?: number;
}

/**
 * Verdict art. The Top gets the mascot sticker — the one mascot appearance
 * this screen is allowed (DESIGN.md) — and falls back to the gold medallion if
 * it fails to load. The Flop goes straight to the neutral medallion: the roast
 * is affectionate, so it never gets the character.
 */
export const VerdictArt: React.FC<VerdictArtProps> = ({
  variant,
  size = 160,
}) => {
  const theme = useTheme();
  const isTop = variant === "top";
  const styles = createStyles(theme, size, isTop);

  const chain = (isTop ? [STICKER] : []).filter(
    (source): source is ImageSource => source !== null
  );
  const [stage, setStage] = useState(0);
  const source = chain[stage] ?? null;

  return (
    <View
      style={styles.frame}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {source ? (
        <Image
          style={styles.art}
          source={source}
          contentFit="contain"
          onError={() => setStage((current) => current + 1)}
        />
      ) : (
        <View style={styles.medallion}>
          <Feather
            name={isTop ? "award" : "meh"}
            size={size * 0.34}
            color={
              isTop
                ? theme.colors.secondary.contrastText
                : theme.colors.text.secondary
            }
          />
        </View>
      )}
    </View>
  );
};

export default VerdictArt;
