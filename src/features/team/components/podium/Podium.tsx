import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { Glow } from "@/components/motion/Glow";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { t } from "@/i18n";
import type { PodiumEntry } from "@/features/team/hooks/useRankingViewModel";
import { tierOf } from "@/features/team/gamification";
import type { Theme } from "@/theme";

interface PodiumProps {
  title: string;
  entries: PodiumEntry[];
  emptyLine: string;
}

/**
 * The three-step podium every leaderboard in sport ends on: first in the
 * middle and highest, second left, third right. The winner stands in a gold
 * light; the steps carry the count in scoreboard numerals. Visual order is
 * 2 · 1 · 3, reading order stays 1 · 2 · 3 for a screen reader.
 */
export const Podium: React.FC<PodiumProps> = ({
  title,
  entries,
  emptyLine,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const byRank = (rank: number) => entries.find((e) => e.rank === rank) ?? null;
  const slots: { entry: PodiumEntry | null; height: number; index: number }[] =
    [
      { entry: byRank(2), height: 64, index: 1 },
      { entry: byRank(1), height: 96, index: 0 },
      { entry: byRank(3), height: 44, index: 2 },
    ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {entries.length === 0 ? (
        <Text style={styles.empty}>{emptyLine}</Text>
      ) : (
        <View style={styles.stage} accessibilityRole="list">
          {slots.map(({ entry, height, index }) =>
            entry ? (
              <StaggerItem key={entry.id} index={index} style={styles.slot}>
                <View style={styles.player}>
                  {entry.rank === 1 ? (
                    <Glow color={theme.colors.secondary.main} size={150} />
                  ) : null}
                  <View
                    style={[
                      styles.ring,
                      entry.rank === 1 && styles.ringGold,
                      entry.isCurrentUser && styles.ringMine,
                    ]}
                  >
                    <PlayerAvatar
                      name={entry.nickname}
                      url={entry.avatarUrl}
                      size={entry.rank === 1 ? 64 : 52}
                      tone={entry.rank === 1 ? "gold" : "neutral"}
                    />
                  </View>
                  <Text style={styles.name} numberOfLines={1}>
                    {entry.nickname}
                  </Text>
                  {entry.isCurrentUser ? (
                    <Text style={styles.you}>{t("common.you")}</Text>
                  ) : null}
                  {tierOf(entry.count) ? (
                    <Text style={styles.tier}>
                      {t(`ranking.tiers.${tierOf(entry.count)}`)}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={[
                    styles.step,
                    { height },
                    entry.rank === 1 && styles.stepGold,
                  ]}
                  accessibilityLabel={`${entry.rank}. ${entry.nickname}, ${entry.count}`}
                >
                  <Text
                    style={[styles.count, entry.rank === 1 && styles.countGold]}
                  >
                    {entry.count}
                  </Text>
                  <Text style={styles.rank}>{entry.rank}</Text>
                </View>
              </StaggerItem>
            ) : (
              <View key={`empty-${index}`} style={styles.slot} />
            )
          )}
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.grey.border,
      paddingTop: theme.spacing.md,
      overflow: "hidden",
    },
    title: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
      paddingHorizontal: theme.spacing.md,
    },
    stage: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      gap: theme.spacing.xs,
    },
    slot: { flex: 1 },
    player: {
      alignItems: "center",
      gap: 4,
      paddingBottom: theme.spacing.sm,
    },
    ring: {
      borderRadius: 999,
      borderWidth: 2,
      borderColor: theme.colors.grey[300],
      padding: 2,
    },
    ringGold: { borderColor: theme.colors.secondary.main },
    ringMine: { borderColor: theme.colors.primary.main },
    name: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
      maxWidth: 110,
    },
    you: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: 10,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.primary.light,
    },
    tier: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: 10,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.hint,
    },
    step: {
      backgroundColor: theme.colors.grey[200],
      borderTopLeftRadius: theme.borderRadius.md,
      borderTopRightRadius: theme.borderRadius.md,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: theme.spacing.xs,
    },
    stepGold: { backgroundColor: theme.colors.secondary.main },
    count: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xl,
      lineHeight: theme.typography.fontSize.xl,
      color: theme.colors.text.primary,
    },
    countGold: { color: theme.colors.secondary.contrastText },
    rank: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: 10,
      color: theme.colors.text.hint,
    },
    empty: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.hint,
      padding: theme.spacing.md,
    },
  });

export default Podium;
