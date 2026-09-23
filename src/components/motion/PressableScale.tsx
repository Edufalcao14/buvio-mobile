import React, { ReactNode, useState } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, { cubicBezier } from "react-native-reanimated";
import { tapSelection } from "./haptics";

interface PressableScaleProps extends Omit<PressableProps, "style"> {
  children: ReactNode;
  /** Applied to the scaling surface, not the hit area. */
  style?: StyleProp<ViewStyle>;
  /** `selectionAsync` on press-in. Off for things pressed constantly. */
  haptic?: boolean;
}

/**
 * Press feedback for every tappable surface: scale to 0.97 in 120ms, on the
 * UI thread as a Reanimated CSS transition — no shared value, no worklet.
 * Feedback fires on press-in and the action commits on press-out, so the
 * latency the user perceives is the finger landing, not the tap completing.
 */
export const PressableScale: React.FC<PressableScaleProps> = ({
  children,
  style,
  haptic = false,
  onPressIn,
  onPressOut,
  disabled,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      hitSlop={rest.hitSlop ?? 6}
      pressRetentionOffset={16}
      onPressIn={(e) => {
        setPressed(true);
        if (haptic && !disabled) {
          tapSelection();
        }
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOut?.(e);
      }}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
            transitionProperty: "transform",
            transitionDuration: 120,
            transitionTimingFunction: cubicBezier(0.23, 1, 0.32, 1),
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default PressableScale;
