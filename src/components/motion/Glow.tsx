import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

interface GlowProps {
  color: string;
  size: number;
  /** 0..1, the centre opacity. */
  intensity?: number;
}

/**
 * A soft radial light behind a hero element — the winner's avatar, the
 * countdown. Static SVG, so it costs one draw and never animates.
 */
export const Glow: React.FC<GlowProps> = ({
  color,
  size,
  intensity = 0.55,
}) => (
  <View
    pointerEvents="none"
    style={[
      styles.wrap,
      {
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      },
    ]}
  >
    <Svg width={size} height={size}>
      <Defs>
        <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={color} stopOpacity={intensity} />
          <Stop offset="55%" stopColor={color} stopOpacity={intensity * 0.25} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#glow)" />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  wrap: { position: "absolute", left: "50%", top: "50%" },
});

export default Glow;
