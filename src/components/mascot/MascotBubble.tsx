import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles, MascotSize } from "./MascotBubble.style";

/**
 * The mascot has poses. Each entry carries its own aspect ratio because the
 * two renders are not the same shape, and the sticker is sized by height.
 */
const MASCOTS = {
  player: {
    source: require("../../../assets/images/sticker_goat.png"),
    aspectRatio: 0.52,
  },
  coach: {
    source: require("../../../assets/images/coach_goat_white.png"),
    aspectRatio: 0.62,
  },
};

interface MascotBubbleProps {
  /** The goat's line — short French banter, spoken as display type. */
  line: string;
  size?: MascotSize;
  /** Which pose the mascot strikes. */
  pose?: keyof typeof MASCOTS;
}

/**
 * A mascot moment: the die-cut goat sticker with his line set directly in
 * display type — no bubble chrome (see DESIGN.md). At most one per screen.
 */
export const MascotBubble: React.FC<MascotBubbleProps> = ({
  line,
  size = "md",
  pose = "player",
}) => {
  const theme = useTheme();
  const mascot = MASCOTS[pose];
  const styles = createStyles(theme, size, mascot.aspectRatio);

  return (
    <View
      style={styles.row}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={line}
    >
      <Image
        style={styles.sticker}
        source={mascot.source}
        contentFit="contain"
      />
      <Text style={styles.line}>{line}</Text>
    </View>
  );
};

export default MascotBubble;
