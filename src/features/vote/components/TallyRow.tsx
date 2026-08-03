import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/providers/ThemeProvider";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { createStyles } from "./TallyRow.styles";

interface MeterProps {
  label: string;
  count: number;
  max: number;
  tone: "top" | "flop";
}

const BAR_DURATION = 420;
const POP_SPRING = { damping: 10, stiffness: 320, mass: 0.5 };

/**
 * One animated meter. The count is pushed by the subscription, so the change
 * itself is the news: the bar eases to its new share and the number pops,
 * rather than the row silently swapping value on re-render.
 */
const Meter: React.FC<MeterProps> = ({ label, count, max, tone }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const share = useSharedValue(0);
  const pop = useSharedValue(1);

  useEffect(() => {
    share.value = withTiming(max > 0 ? count / max : 0, {
      duration: BAR_DURATION,
    });
  }, [count, max, share]);

  useEffect(() => {
    if (count === 0) {
      return;
    }

    pop.value = withSequence(
      withSpring(1.3, POP_SPRING),
      withSpring(1, POP_SPRING),
    );
  }, [count, pop]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${Math.min(1, Math.max(0, share.value)) * 100}%`,
  }));

  const countStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pop.value }],
  }));

  return (
    <View style={styles.meter}>
      <Text style={styles.meterLabel}>{label}</Text>
      <View style={styles.track}>
        <Animated.View
          style={[tone === "top" ? styles.fillTop : styles.fillFlop, fillStyle]}
        />
      </View>
      <Animated.Text style={[styles.count, countStyle]}>{count}</Animated.Text>
    </View>
  );
};

interface TallyRowProps {
  /** The name the squad knows the player by. */
  name: string;
  /** Their avatar, when they have one. */
  avatarUrl?: string | null;
  topCount: number;
  flopCount: number;
  max: number;
}

export const TallyRow: React.FC<TallyRowProps> = ({
  name,
  avatarUrl,
  topCount,
  flopCount,
  max,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`${name} : ${topCount} top, ${flopCount} flop`}
    >
      <View style={styles.header}>
        <PlayerAvatar name={name} url={avatarUrl} size={36} />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <View style={styles.meters}>
        <Meter label="Top" count={topCount} max={max} tone="top" />
        <Meter label="Flop" count={flopCount} max={max} tone="flop" />
      </View>
    </View>
  );
};

export default TallyRow;
