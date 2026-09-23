import React from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { Button } from "@/components/buttons/button";
import { ListSkeleton } from "@/components/motion/Skeleton";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { useRankingViewModel } from "../hooks/useRankingViewModel";
import { PodiumCard } from "../components/podium/PodiumCard";
import { Podium } from "../components/podium/Podium";
import { createStyles } from "./Ranking.styles";
import { t } from "@/i18n";

export default function Ranking() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {
    topPodium,
    flopPodium,
    hasVerdicts,
    mine,
    isLoading,
    isRefreshing,
    errorMessage,
    refetch,
  } = useRankingViewModel();

  if (isLoading) {
    return <ListSkeleton rows={2} testID="ranking-skeleton" />;
  }

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <MascotBubble line={t("ranking.errorMascot")} />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <View style={styles.retryButton}>
          <Button
            text={t("common.retry")}
            onPress={async () => {
              await refetch();
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refetch}
          tintColor={theme.colors.primary.light}
          colors={[theme.colors.primary.light]}
        />
      }
    >
      {hasVerdicts && mine ? (
        // My season card: rank in the Top race, the two counts, and the
        // trophy tier with the gap to the next one — the NRC "next
        // milestone always visible" pattern.
        <StaggerItem index={0}>
          <View style={styles.mine} accessibilityRole="summary">
            <View style={styles.mineHeader}>
              <Text style={styles.mineLabel}>{t("ranking.mySeason")}</Text>
              {mine.tier ? (
                <View style={[styles.tierChip, styles[`tier_${mine.tier}`]]}>
                  <Feather
                    name="award"
                    size={12}
                    color={
                      mine.tier === "or"
                        ? theme.colors.secondary.contrastText
                        : theme.colors.text.primary
                    }
                  />
                  <Text
                    style={[
                      styles.tierText,
                      mine.tier === "or" && styles.tierTextOr,
                    ]}
                  >
                    {t(`ranking.tiers.${mine.tier}`)}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.mineRow}>
              <View style={styles.mineStat}>
                <Text style={styles.mineValue}>
                  {mine.rank ? `#${mine.rank}` : "–"}
                </Text>
                <Text style={styles.mineStatLabel}>
                  {t("ranking.of", { count: mine.teamSize })}
                </Text>
              </View>
              <View style={styles.mineDivider} />
              <View style={styles.mineStat}>
                <AnimatedNumber
                  value={mine.topCount}
                  style={[styles.mineValue, styles.mineValueGold]}
                />
                <Text style={styles.mineStatLabel}>
                  {t("ranking.tops", { count: mine.topCount })}
                </Text>
              </View>
              <View style={styles.mineDivider} />
              <View style={styles.mineStat}>
                <AnimatedNumber
                  value={mine.flopCount}
                  style={styles.mineValue}
                />
                <Text style={styles.mineStatLabel}>
                  {t("ranking.flops", { count: mine.flopCount })}
                </Text>
              </View>
            </View>
            {mine.nextTierGap !== null ? (
              <Text style={styles.mineHint}>
                {t("ranking.nextTier", { count: mine.nextTierGap })}
              </Text>
            ) : (
              <Text style={styles.mineHint}>{t("ranking.goldReached")}</Text>
            )}
          </View>
        </StaggerItem>
      ) : null}

      {hasVerdicts ? (
        <Text style={styles.caption}>{t("ranking.caption")}</Text>
      ) : (
        <View style={styles.header}>
          <MascotBubble line={t("ranking.emptyMascot")} size="sm" />
        </View>
      )}

      <Podium
        title={t("ranking.topTitle")}
        entries={topPodium}
        emptyLine={t("ranking.topEmpty")}
      />

      <StaggerItem index={2}>
        <PodiumCard
          title={t("ranking.flopTitle")}
          emoji=""
          variant="flop"
          entries={flopPodium}
          emptyLine={t("ranking.flopEmpty")}
        />
      </StaggerItem>
    </ScrollView>
  );
}
