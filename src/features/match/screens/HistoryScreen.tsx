import React from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ListSkeleton } from "@/components/motion/Skeleton";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { useTheme } from "@/providers/ThemeProvider";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { Button } from "@/components/buttons/button";
import { useHistoryViewModel } from "../hooks/useHistoryViewModel";
import { MatchHistoryCard } from "../components/matchHistoryCard/MatchHistoryCard";
import { LiveVoteBanner } from "../components/LiveVoteBanner";
import { usePendingVoteViewModel } from "@/features/vote";
import { createStyles } from "./History.styles";
import { t } from "@/i18n";

export default function History() {
  const theme = useTheme();
  const router = useRouter();
  const styles = createStyles(theme);
  const {
    sections,
    summary,
    isLoading,
    isRefreshing,
    isLoadingMore,
    loadMore,
    errorMessage,
    refetch,
  } = useHistoryViewModel();
  const { pendingVote } = usePendingVoteViewModel();

  if (isLoading) {
    return <ListSkeleton rows={3} testID="history-skeleton" />;
  }

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <MascotBubble line={t("history.errorMascot")} />
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
    <SectionList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      sections={sections}
      keyExtractor={(match) => match.id}
      renderItem={({ item }) => (
        <MatchHistoryCard
          match={item}
          // Only matches whose vote exists have a session to open.
          onPress={
            item.outcome.kind === "upcoming" ||
            item.outcome.kind === "notStarted"
              ? undefined
              : () => router.push(`/vote/${item.id}`)
          }
        />
      )}
      renderSectionHeader={({ section }) => (
        // Sticky: scrolling deep into the archive never loses the month.
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionRule} />
          <Text style={styles.sectionCount}>{section.matchCount}</Text>
        </View>
      )}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
      // Fetches the next page before the player reaches the bottom, so a long
      // archive scrolls continuously instead of stopping at the first page.
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator
            style={styles.footerSpinner}
            color={theme.colors.primary.light}
          />
        ) : null
      }
      SectionSeparatorComponent={() => <View style={styles.sectionSpacer} />}
      ItemSeparatorComponent={() => <View style={styles.itemSpacer} />}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refetch}
          tintColor={theme.colors.primary.light}
          colors={[theme.colors.primary.light]}
        />
      }
      ListHeaderComponent={
        summary.matchCount > 0 ? (
          <StaggerItem index={0}>
            {pendingVote ? (
              <View style={styles.banner}>
                <LiveVoteBanner
                  matchName={pendingVote.matchName}
                  onPress={() => router.push(`/vote/${pendingVote.matchId}`)}
                />
              </View>
            ) : null}
            {/* The scoreboard counts up once, on the content the player
                opened the tab for. */}
            <View style={styles.summary}>
              <View style={styles.summaryItem}>
                <AnimatedNumber
                  value={summary.matchCount}
                  style={styles.summaryValue}
                />
                <Text style={styles.summaryLabel}>
                  {t("history.matches", { count: summary.matchCount })}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <AnimatedNumber
                  value={summary.decidedCount}
                  style={styles.summaryValue}
                />
                <Text style={styles.summaryLabel}>
                  {t("history.verdicts", { count: summary.decidedCount })}
                </Text>
              </View>
              {/* Only shown when something is still open — no empty boasting. */}
              {summary.liveCount > 0 ? (
                <>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <AnimatedNumber
                      value={summary.liveCount}
                      style={[styles.summaryValue, styles.summaryLiveValue]}
                    />
                    <Text style={styles.summaryLabel}>
                      {t("history.liveVotes", { count: summary.liveCount })}
                    </Text>
                  </View>
                </>
              ) : null}
            </View>
            {/* "On fire": the same Top on consecutive nights. */}
            {summary.streak ? (
              <View style={styles.streak} accessibilityRole="text">
                <Feather
                  name="zap"
                  size={14}
                  color={theme.colors.secondary.main}
                />
                <Text style={styles.streakText}>
                  <Text style={styles.streakName}>{summary.streak.name}</Text>
                  {`  ·  ${t("history.streak", { count: summary.streak.count })}`}
                </Text>
              </View>
            ) : null}
          </StaggerItem>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <MascotBubble line={t("history.emptyMascot")} />
        </View>
      }
    />
  );
}
