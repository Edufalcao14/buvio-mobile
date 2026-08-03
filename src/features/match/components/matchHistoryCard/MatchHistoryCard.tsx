import React from "react";
import { Pressable, View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { HistoryMatch } from "@/features/match/hooks/useHistoryViewModel";
import { Tag } from "./Tag";
import { createStyles } from "./MatchHistoryCard.style";

interface MatchHistoryCardProps {
  match: HistoryMatch;
  /** Optional: the card only becomes a button when there is somewhere to go. */
  onPress?: () => void;
}

export const MatchHistoryCard: React.FC<MatchHistoryCardProps> = ({
  match,
  onPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const content = (
    <>
      {/* The date block anchors the row: a history is read by when. */}
      <View style={styles.dateBlock}>
        <Text style={styles.day}>{match.dayLabel}</Text>
        <Text style={styles.month}>{match.monthLabel}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {match.name}
        </Text>

        {/* Type, vote state and — once closed — the verdict, all as chips. */}
        <View style={styles.tagRow}>
          {match.tags.map((tag) => (
            <Tag key={tag.id} label={tag.label} variant={tag.variant} />
          ))}
        </View>

        <Text style={styles.players}>
          {match.playerCount} {match.playerCount === 1 ? "joueur" : "joueurs"}
        </Text>
      </View>
    </>
  );

  if (!onPress) {
    return <View style={styles.card}>{content}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={match.name}
      // Subtle: the bubble sinks a hair and warms up, no bounce.
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {content}
    </Pressable>
  );
};

export default MatchHistoryCard;
