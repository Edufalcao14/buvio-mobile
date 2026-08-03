import React from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { Button } from "@/components/buttons/button";
import { useRankingViewModel } from "../hooks/useRankingViewModel";
import { PodiumCard } from "../components/podium/PodiumCard";
import { createStyles } from "./Ranking.styles";

export default function Ranking() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {
    topPodium,
    flopPodium,
    hasVerdicts,
    isLoading,
    isRefreshing,
    errorMessage,
    refetch,
  } = useRankingViewModel();

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
        <MascotBubble line="Le classement a glissé sous le comptoir…" />
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
      {hasVerdicts ? (
        <Text style={styles.caption}>
          Compté sur les votes clos, meilleur d’abord.
        </Text>
      ) : (
        <View style={styles.header}>
          <MascotBubble
            line="Personne n’a encore de trophée. Premier match, premier verdict !"
            size="sm"
          />
        </View>
      )}

      <PodiumCard
        title="Les plus TOP"
        emoji="👑"
        variant="top"
        entries={topPodium}
        emptyLine="Aucun top pour l’instant."
      />

      <PodiumCard
        title="Les plus FLOP"
        emoji="💩"
        variant="flop"
        entries={flopPodium}
        emptyLine="Aucun flop pour l’instant."
      />
    </ScrollView>
  );
}
