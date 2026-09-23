import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { MatchTagVariant } from "@/features/match/hooks/useHistoryViewModel";
import { LiveDot } from "@/components/motion/LiveDot";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { createStyles } from "./Tag.styles";

interface TagProps {
  label: string;
  variant?: MatchTagVariant;
  /** A player's name: the chip leads with their monogram (verdict chips). */
  avatar?: string;
}

/**
 * The one place a fixture chip is styled. Variants stay a closed set so gold
 * cannot leak onto anything but an honour. A live chip breathes; a verdict
 * chip wears the player's face.
 */
export const Tag: React.FC<TagProps> = ({
  label,
  variant = "neutral",
  avatar,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const container = {
    neutral: styles.neutralTag,
    live: styles.liveTag,
    honours: styles.honoursTag,
  }[variant];

  const text = {
    neutral: styles.neutralLabel,
    live: styles.liveLabel,
    honours: styles.honoursLabel,
  }[variant];

  return (
    <View style={[styles.tag, container, avatar ? styles.withAvatar : null]}>
      {variant === "live" ? (
        <LiveDot color={theme.colors.primary.light} size={6} />
      ) : null}
      {avatar ? (
        <PlayerAvatar
          name={avatar}
          size={18}
          tone={variant === "honours" ? "neutral" : "neutral"}
        />
      ) : null}
      <Text style={[styles.label, text]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

export default Tag;
