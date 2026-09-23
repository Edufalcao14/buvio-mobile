import React from "react";
import { View } from "react-native";
import Animated, { useReducedMotion } from "react-native-reanimated";

interface LiveDotProps {
  color: string;
  size?: number;
}

/**
 * The "this is happening now" dot every sports app puts next to a live
 * fixture: a solid core with a soft ring breathing out of it. The ring is a
 * Reanimated CSS keyframe on transform+opacity, UI thread only; reduced
 * motion keeps the solid dot and drops the pulse.
 */
export const LiveDot: React.FC<LiveDotProps> = ({ color, size = 8 }) => {
  const reduced = useReducedMotion();

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {!reduced ? (
        <Animated.View
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            opacity: 0.5,
            animationName: {
              from: { transform: [{ scale: 1 }], opacity: 0.55 },
              to: { transform: [{ scale: 2.6 }], opacity: 0 },
            },
            animationDuration: "1400ms",
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-out",
          }}
        />
      ) : null}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export default LiveDot;
