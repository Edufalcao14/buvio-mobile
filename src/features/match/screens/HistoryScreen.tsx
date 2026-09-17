import React from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  Text,
  View,
} from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { Button } from "@/components/buttons/button";
import { useHistoryViewModel } from "../hooks/useHistoryViewModel";
import { MatchHistoryCard } from "../components/matchHistoryCard/MatchHistoryCard";
import { createStyles } from "./History.styles";

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary.light} />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <MascotBubble line="Le tableau du club est tombé…" />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <View style={styles.retryButton}>
          <Button
            text="Réessayer"
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
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{summary.matchCount}</Text>
              <Text style={styles.summaryLabel}>
                {summary.matchCount === 1 ? "match" : "matchs"}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{summary.decidedCount}</Text>
              <Text style={styles.summaryLabel}>
                {summary.decidedCount === 1 ? "verdict" : "verdicts"}
              </Text>
            </View>
            {/* Only shown when something is still open — no empty boasting. */}
            {summary.liveCount > 0 ? (
              <>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, styles.summaryLiveValue]}>
                    {summary.liveCount}
                  </Text>
                  <Text style={styles.summaryLabel}>
                    {summary.liveCount === 1 ? "vote ouvert" : "votes ouverts"}
                  </Text>
                </View>
              </>
            ) : null}
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <MascotBubble line="Rien dans les archives. Le premier match s’écrit tout seul ?" />
        </View>
      }
    />
  );
}
