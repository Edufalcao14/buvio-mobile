import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./MascotBubble.style";

interface MascotBubbleProps {
  /** The goat's line — short French banter, spoken as display type. */
  line: string;
  size?: "sm" | "md";
}

/**
 * A mascot moment: the die-cut goat sticker with his line set directly in
 * display type — no bubble chrome (see DESIGN.md). At most one per screen.
 */
export const MascotBubble: React.FC<MascotBubbleProps> = ({
  line,
  size = "md",
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, size);

  return (
    <View
      style={styles.row}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={line}
    >
      <Image
        style={styles.sticker}
        source={require("../../../assets/images/sticker_goat.png")}
        contentFit="contain"
      />
      <Text style={styles.line}>{line}</Text>
    </View>
  );
};

export default MascotBubble;
