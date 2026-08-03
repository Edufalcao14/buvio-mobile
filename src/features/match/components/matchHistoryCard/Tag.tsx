import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { MatchTagVariant } from "@/features/match/hooks/useHistoryViewModel";
import { createStyles } from "./Tag.styles";

interface TagProps {
  label: string;
  variant?: MatchTagVariant;
}

/**
 * The one place a history chip is styled. Variants stay a closed set so gold
 * cannot leak onto anything but an honour.
 */
export const Tag: React.FC<TagProps> = ({ label, variant = "neutral" }) => {
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
    <View style={[styles.tag, container]}>
      <Text style={[styles.label, text]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

export default Tag;
