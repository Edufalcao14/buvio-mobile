import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { PodiumEntry } from "@/features/team/hooks/useRankingViewModel";
import { createStyles } from "./PodiumCard.styles";

interface PodiumCardProps {
  title: string;
  emoji: string;
  /** The gold podium is the honours one; the flop podium stays neutral. */
  variant: "top" | "flop";
  entries: PodiumEntry[];
  emptyLine: string;
}

const MEDALS = ["🥇", "🥈", "🥉"];

export const PodiumCard: React.FC<PodiumCardProps> = ({
  title,
  emoji,
  variant,
  entries,
  emptyLine,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, variant);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {entries.length === 0 ? (
        <Text style={styles.empty}>{emptyLine}</Text>
      ) : (
        entries.map((entry) => (
          <View
            key={entry.id}
            style={[styles.row, entry.isCurrentUser && styles.rowMine]}
          >
            <Text style={styles.medal}>{MEDALS[entry.rank - 1] ?? ""}</Text>
            <PlayerAvatar
              name={entry.nickname}
              url={entry.avatarUrl}
              size={32}
              tone={variant === "top" && entry.rank === 1 ? "gold" : "neutral"}
            />
            <Text style={styles.name} numberOfLines={1}>
              {entry.nickname}
              {entry.isCurrentUser ? (
                <Text style={styles.youTag}> toi</Text>
              ) : null}
            </Text>
            <Text style={styles.count}>{entry.count}</Text>
          </View>
        ))
      )}
    </View>
  );
};

export default PodiumCard;
