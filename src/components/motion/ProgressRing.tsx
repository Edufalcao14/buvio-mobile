import React, { ReactNode, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

interface ProgressRingProps {
  /** 0..1 */
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  trackColor: string;
  /** Rendered in the hole — a number, a label. */
  children?: ReactNode;
}

/**
 * A ring that fills to `progress`. The dash offset is the one property that
 * moves, on the UI thread; the track and geometry are static. Starts at 12
 * o'clock and fills clockwise like every platform activity ring.
 */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 72,
  strokeWidth = 6,
  color,
  trackColor,
  children,
}) => {
  const reduced = useReducedMotion();
  const clamped = Math.min(1, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const share = useSharedValue(reduced ? clamped : 0);

  useEffect(() => {
    share.set(
      reduced
        ? clamped
        : withTiming(clamped, { duration: 600, easing: EASE_OUT })
    );
  }, [clamped, reduced, share]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - share.get()),
  }));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          // Rotate so the fill starts at the top, not at 3 o'clock.
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProgressRing;
