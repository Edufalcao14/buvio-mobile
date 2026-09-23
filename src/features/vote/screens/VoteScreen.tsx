import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/buttons/button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { useVoteViewModel } from "@/features/vote/hooks/useVoteViewModel";
import VoteBallotScreen from "./VoteBallotScreen";
import VoteLiveScreen from "./VoteLiveScreen";
import VoteResultScreen from "./VoteResultScreen";
import { createStyles } from "./Vote.styles";
import { t } from "@/i18n";

interface VoteScreenProps {
  matchId: string;
  onClose: () => void;
}

/**
 * One screen, three faces. The session state decides which one is on: as soon
 * as the ballot is complete the player lands on the live count, and the
 * moment the session closes the verdict takes over — all pushed by the
 * subscription, without a navigation step.
 */
export default function VoteScreen({ matchId, onClose }: VoteScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [startError, setStartError] = useState<string | null>(null);

  const {
    phase,
    matchName,
    eligibleForTop,
    eligibleForFlop,
    ballots,
    tally,
    maxTallyCount,
    secondsRemaining,
    isAdmin,
    isSubmitting,
    isClosing,
    isStarting,
    topVerdict,
    flopVerdict,
    closedReasonLabel,
    liveErrorMessage,
    errorMessage,
    refetch,
    submitBallot,
    closeSession,
    startSession,
  } = useVoteViewModel(matchId);

  const handleStart = async () => {
    setStartError(null);
    const failure = await startSession();

    if (failure) {
      setStartError(failure);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable
          style={styles.backButton}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t("common.close")}
        >
          <Feather
            name="chevron-left"
            size={24}
            color={theme.colors.text.primary}
          />
        </Pressable>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {matchName ?? t("vote.fallbackTitle")}
        </Text>
      </View>

      {liveErrorMessage ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            {t("vote.liveNotice", { message: liveErrorMessage })}
          </Text>
        </View>
      ) : null}

      <View style={styles.body}>
        {phase === "loading" ? (
          <View style={styles.centered}>
            <ActivityIndicator
              size="large"
              color={theme.colors.primary.light}
            />
          </View>
        ) : null}

        {phase === "error" ? (
          <View style={styles.centered}>
            <MascotBubble line={t("vote.errorMascot")} />
            <Text style={styles.stateText}>
              {errorMessage ?? t("vote.errorFallback")}
            </Text>
            <View style={styles.action}>
              <Button
                text={t("common.retry")}
                onPress={async () => {
                  await refetch();
                }}
              />
            </View>
          </View>
        ) : null}

        {phase === "noSession" ? (
          <View style={styles.centered}>
            <MascotBubble line={t("vote.noSessionMascot")} />
            <Text style={styles.stateText}>{t("vote.noSessionText")}</Text>
            {startError ? (
              <Text style={styles.stateText}>{startError}</Text>
            ) : null}
            <View style={styles.action}>
              <Button
                text={t("vote.open")}
                isLoading={isStarting}
                onPress={handleStart}
              />
            </View>
          </View>
        ) : null}

        {phase === "ballot" ? (
          <VoteBallotScreen
            eligibleForTop={eligibleForTop}
            eligibleForFlop={eligibleForFlop}
            isSubmitting={isSubmitting}
            onSubmit={submitBallot}
          />
        ) : null}

        {phase === "live" ? (
          <VoteLiveScreen
            ballots={ballots}
            tally={tally}
            maxTallyCount={maxTallyCount}
            secondsRemaining={secondsRemaining}
            isAdmin={isAdmin}
            isClosing={isClosing}
            onClose={closeSession}
          />
        ) : null}

        {phase === "result" ? (
          <VoteResultScreen
            matchId={matchId}
            topName={topVerdict?.nickname ?? null}
            topAvatarUrl={topVerdict?.avatarUrl ?? null}
            flopName={flopVerdict?.nickname ?? null}
            flopAvatarUrl={flopVerdict?.avatarUrl ?? null}
            closedReasonLabel={closedReasonLabel}
            tally={tally}
            maxTallyCount={maxTallyCount}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
