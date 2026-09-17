import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { createStyles } from "./PlayerChoiceCard.styles";

interface PlayerChoiceCardProps {
  /** The name the squad knows the player by. */
  name: string;
  /** Their avatar, when they have one. */
  avatarUrl?: string | null;
  isSelected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PRESS_SPRING = { damping: 14, stiffness: 260, mass: 0.6 };

/**
 * A big, thumb-sized card for one candidate. The press springs the card down
 * and back so a tap on a 76pt target still feels like it landed.
 */
export const PlayerChoiceCard: React.FC<PlayerChoiceCardProps> = ({
  name,
  avatarUrl,
  isSelected,
  onPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, isSelected);
  // The spring is declared in the style rather than pushed into a shared
  // value from the handler: mutating a shared value from an event handler is
  // exactly what the React Compiler's immutability rule forbids.
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isPressed ? 0.96 : 1, PRESS_SPRING) }],
  }));

  return (
    <AnimatedPressable
      style={[styles.card, animatedStyle]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="radio"
      accessibilityLabel={name}
      accessibilityState={{ selected: isSelected }}
    >
      <PlayerAvatar
        name={name}
        url={avatarUrl}
        tone={isSelected ? "green" : "neutral"}
      />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      {isSelected ? (
        <Animated.View style={styles.check}>
          <Feather
            name="check"
            size={16}
            color={theme.colors.primary.contrastText}
          />
        </Animated.View>
      ) : null}
    </AnimatedPressable>
  );
};

export default PlayerChoiceCard;
