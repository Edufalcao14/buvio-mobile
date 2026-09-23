import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { tapSelection } from "@/components/motion/haptics";
import { createStyles } from "./PlayerChoiceCard.styles";

interface PlayerChoiceCardProps {
  /** The name the squad knows the player by. */
  name: string;
  avatarUrl?: string | null;
  isSelected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const PRESS_SPRING = { damping: 14, stiffness: 260, mass: 0.6 };

/**
 * One candidate as a tile: a big face, the name, and a check that lands in
 * the corner when picked. Two per row, so a full squad fits on one screen
 * and the thumb never travels far. The press springs the tile down and back
 * so a tap on a face still feels like it landed.
 */
export const PlayerChoiceCard: React.FC<PlayerChoiceCardProps> = ({
  name,
  avatarUrl,
  isSelected,
  onPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, isSelected);
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isPressed ? 0.96 : 1, PRESS_SPRING) }],
  }));

  return (
    <AnimatedPressable
      style={[styles.card, animatedStyle]}
      onPress={() => {
        if (!isSelected) tapSelection();
        onPress();
      }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="radio"
      accessibilityLabel={name}
      accessibilityState={{ selected: isSelected }}
    >
      <View style={styles.ring}>
        <PlayerAvatar
          name={name}
          url={avatarUrl}
          size={64}
          tone={isSelected ? "green" : "neutral"}
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      {isSelected ? (
        <View style={styles.check}>
          <Feather
            name="check"
            size={14}
            color={theme.colors.primary.contrastText}
          />
        </View>
      ) : null}
    </AnimatedPressable>
  );
};

export default PlayerChoiceCard;
