import React, { useEffect } from "react";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

interface AnimatedNumberProps {
  value: number;
  style?: StyleProp<TextStyle>;
  /** ms for the whole count. */
  duration?: number;
}

/**
 * A scoreboard number that counts up to its value. The text is driven through
 * `useAnimatedProps` so every frame stays on the UI thread — a `setState`
 * counter would re-render React sixty times a second for a cosmetic effect.
 *
 * Renders as a non-editable TextInput (the one RN text node whose content can
 * be set from a worklet), so tests read it with `getByDisplayValue`.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  style,
  duration = 500,
}) => {
  const reduced = useReducedMotion();
  const progress = useSharedValue(reduced ? value : 0);

  useEffect(() => {
    progress.set(
      reduced ? value : withTiming(value, { duration, easing: EASE_OUT })
    );
  }, [value, duration, reduced, progress]);

  // `text` is the native prop that sets a TextInput's content imperatively;
  // it is not in the public TextInputProps, hence the widened generic.
  const animatedProps = useAnimatedProps<TextInputProps & { text?: string }>(
    () => ({ text: String(Math.round(progress.get())) })
  );

  return (
    <AnimatedTextInput
      animatedProps={animatedProps}
      // The static default is what a test (and a screen reader) reads; the
      // animated `text` prop overrides what is drawn from the first frame.
      defaultValue={String(value)}
      editable={false}
      underlineColorAndroid="transparent"
      accessibilityLabel={String(value)}
      style={[{ padding: 0, margin: 0 }, style]}
    />
  );
};

export default AnimatedNumber;
