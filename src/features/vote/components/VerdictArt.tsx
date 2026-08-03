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

const TOP_ART = tryRequire(() => require("../../../../assets/images/buvio_top.png"));
const FLOP_ART = tryRequire(() => require("../../../../assets/images/buvio_flop.png"));
const STICKER = tryRequire(() => require("../../../../assets/images/sticker_goat.png"));

interface VerdictArtProps {
  variant: "top" | "flop";
  size?: number;
}

/**
 * Verdict art with the fallback chain the plan requires: the dedicated
 * artwork, then the mascot sticker, then a plain medallion. Runtime load
 * failures step down the same chain.
 */
export const VerdictArt: React.FC<VerdictArtProps> = ({
  variant,
  size = 160,
}) => {
  const theme = useTheme();
  const isTop = variant === "top";
  const styles = createStyles(theme, size, isTop);

  const chain = [isTop ? TOP_ART : FLOP_ART, STICKER].filter(
    (source): source is ImageSource => source !== null,
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
