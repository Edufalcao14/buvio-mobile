import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import Animated, { useReducedMotion } from "react-native-reanimated";
import { useTheme } from "@/providers/ThemeProvider";
import { t } from "@/i18n";

interface SkeletonProps {
  width?: DimensionValue;
  height: number;
  radius?: number;
  style?: object;
}

/**
 * A placeholder shaped like the content it stands in for. The pulse is a
 * Reanimated CSS keyframe animation — declared in the style, run on the UI
 * thread, no JS timer. Reduced motion holds it still at mid-opacity.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height,
  radius,
  style,
}) => {
  const theme = useTheme();
  const reduced = useReducedMotion();

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          borderRadius: radius ?? theme.borderRadius.md,
          backgroundColor: theme.colors.grey[200],
          opacity: 0.7,
        },
        !reduced && {
          animationName: {
            from: { opacity: 0.45 },
            to: { opacity: 0.9 },
          },
          animationDuration: "900ms",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out",
        },
        style,
      ]}
    />
  );
};

/** The scoreboard-and-rows shape shared by the History and Ranking screens. */
export const ListSkeleton: React.FC<{ rows?: number; testID?: string }> = ({
  rows = 3,
  testID = "skeleton",
}) => {
  const theme = useTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={t("common.loading")}
      style={[
        styles.list,
        { padding: theme.spacing.md, gap: theme.spacing.sm },
      ]}
    >
      <Skeleton height={96} radius={theme.borderRadius.lg} />
      <View style={{ height: theme.spacing.sm }} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height={84} radius={theme.borderRadius.lg} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: { flex: 1 },
});

export default Skeleton;
