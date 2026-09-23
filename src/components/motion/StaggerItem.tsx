import React, { ReactNode, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useReducedMotion,
} from "react-native-reanimated";

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

interface StaggerItemProps {
  index: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** ms between siblings. 30–80 reads as a cascade; outside that it reads as slow or as one frame. */
  step?: number;
}

/**
 * Entrance for content the user asked for and is waiting on — a standings
 * table, a verdict — never a row inside a virtualized list (rows recycle and
 * the animation would re-fire on every scroll). Reduced motion keeps the fade
 * and drops the translation.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  index,
  children,
  style,
  step = 40,
}) => {
  const reduced = useReducedMotion();
  const entering = useMemo(
    () =>
      (reduced ? FadeIn : FadeInDown)
        .duration(260)
        .delay(index * step)
        .easing(EASE_OUT),
    [index, reduced, step]
  );

  return (
    <Animated.View entering={entering} style={style}>
      {children}
    </Animated.View>
  );
};

export default StaggerItem;
