import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { GoatIcon } from "@/components/icons/GoatIcon";
import { PressableScale } from "@/components/motion/PressableScale";
import { useTheme } from "@/providers/ThemeProvider";
import { HistoryMatch } from "@/features/match/hooks/useHistoryViewModel";
import { Tag } from "./Tag";
import { createStyles } from "./MatchHistoryCard.styles";
import { t } from "@/i18n";

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

        {/* Type and vote state as chips; the verdict gets its own spotlight. */}
        <View style={styles.tagRow}>
          {match.tags
            .filter(
              (tag) =>
                match.outcome.kind !== "result" ||
                (tag.id !== "top" && tag.id !== "flop")
            )
            .map((tag) => (
              <Tag key={tag.id} label={tag.label} variant={tag.variant} />
            ))}
        </View>

        {/* The night's verdict: the GOAT (our goat) for the Top, the drop for
            the Flop — two faces side by side, gold and neutral. */}
        {match.outcome.kind === "result" ? (
          <View style={styles.spotlight}>
            {/* Top: gold card, the face with the goat pinned to it as a badge. */}
            <View
              style={[styles.spot, styles.spotTop]}
              accessible
              accessibilityLabel={t("history.tags.top", {
                name: match.outcome.topName,
              })}
            >
              <View style={styles.face}>
                <PlayerAvatar name={match.outcome.topName} size={40} />
                <View style={[styles.badge, styles.badgeTop]}>
                  <GoatIcon size={14} color={theme.colors.secondary.main} />
                </View>
              </View>
              <View style={styles.spotText}>
                <Text style={[styles.spotKind, styles.spotKindTop]}>
                  {t("common.top")}
                </Text>
                <Text
                  style={[styles.spotName, styles.spotNameTop]}
                  numberOfLines={1}
                >
                  {match.outcome.topName}
                </Text>
              </View>
            </View>
            {/* Flop: same shape in neutral, the drop as the badge. */}
            <View
              style={styles.spot}
              accessible
              accessibilityLabel={t("history.tags.flop", {
                name: match.outcome.flopName,
              })}
            >
              <View style={styles.face}>
                <PlayerAvatar name={match.outcome.flopName} size={40} />
                <View style={styles.badge}>
                  <Feather
                    name="trending-down"
                    size={11}
                    color={theme.colors.text.primary}
                  />
                </View>
              </View>
              <View style={styles.spotText}>
                <Text style={styles.spotKind}>{t("common.flop")}</Text>
                <Text style={styles.spotName} numberOfLines={1}>
                  {match.outcome.flopName}
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        <Text style={styles.players}>
          {t("common.players", { count: match.playerCount })}
        </Text>
      </View>
    </>
  );

  if (!onPress) {
    return <View style={styles.card}>{content}</View>;
  }

  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={match.name}
      style={styles.card}
    >
      {content}
    </PressableScale>
  );
};

export default MatchHistoryCard;
