import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./AuthHero.style";

interface AuthHeroProps {
  /** The goat's line, spoken as display type. */
  title: string;
  /** Word(s) inside `title` to paint gold (must match exactly). */
  accent?: string;
  /**
   * Which cut of the mascot to slap on the stage. The white outline is what
   * reads here: the goat sits mostly on the green, where a green outline
   * disappears and a plain cutout has no sticker edge at all.
   */
  mascot?: "cutout" | "whiteOutline" | "greenOutline";
}

/**
 * The vestiaire stage: full-green hero where the mascot leans over the
 * sheet and his line IS the headline (see DESIGN.md — no bubble chrome).
 */
const MASCOTS = {
  cutout: require("../../../../assets/images/sticker_goat.png"),
  whiteOutline: require("../../../../assets/images/sticker_goat_white.png"),
  greenOutline: require("../../../../assets/images/sticker_goat_green.png"),
};

export const AuthHero: React.FC<AuthHeroProps> = ({
  title,
  accent,
  mascot = "cutout",
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const parts =
    accent && title.includes(accent) ? title.split(accent) : [title];

  return (
    <View style={styles.hero}>
      <Text style={styles.wordmark}>Buvio</Text>
      <Text style={styles.title} accessibilityRole="header">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <Text style={styles.titleAccent}>{accent}</Text>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </Text>
      <Image
        style={styles.goat}
        source={MASCOTS[mascot]}
        contentFit="contain"
        accessibilityLabel="La mascotte du club"
      />
    </View>
  );
};

export default AuthHero;
