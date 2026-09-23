import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/buttons/button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { TallyRow } from "@/features/vote/components/TallyRow";
import { ProgressRing } from "@/components/motion/ProgressRing";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { LiveDot } from "@/components/motion/LiveDot";
import { Glow } from "@/components/motion/Glow";
import { AvatarStack } from "@/components/avatars/AvatarStack";
import type {
  VoteBallotRow,
  VoteTallyRow,
} from "@/features/vote/hooks/useVoteViewModel";
import { t } from "@/i18n";
import { createStyles } from "./VoteLive.styles";

interface VoteLiveScreenProps {
  ballots: VoteBallotRow[];
  tally: VoteTallyRow[];
  maxTallyCount: number;
  secondsRemaining: number | null;
  isAdmin: boolean;
  isClosing: boolean;
  onClose: () => Promise<string | null>;
}

/** mm:ss — a vote is minutes long, so hours would be noise. */
export const formatCountdown = (totalSeconds: number): string => {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

/**
 * The vote in flight, laid out like a live match: the clock as the hero,
 * the ballots as a ring and a row of faces (green ring = has voted), then
 * the running count. Everything arrives over the subscription.
 */
export default function VoteLiveScreen({
  ballots,
  tally,
  maxTallyCount,
  secondsRemaining,
  isAdmin,
  isClosing,
  onClose,
}: VoteLiveScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [errorText, setErrorText] = useState<string | null>(null);

  const doneCount = ballots.filter((ballot) => ballot.isComplete).length;
  const hasVotes = tally.some((row) => row.topCount > 0 || row.flopCount > 0);

  const handleClose = async () => {
    setErrorText(null);
    const failure = await onClose();
    if (failure) setErrorText(failure);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Hero: the clock. */}
      <StaggerItem index={0}>
        <View style={styles.hero}>
          <Glow color={theme.colors.primary.main} size={260} intensity={0.35} />
          <View style={styles.liveRow}>
            <LiveDot color={theme.colors.primary.light} />
            <Text style={styles.liveLabel}>{t("vote.live.title")}</Text>
          </View>
          {secondsRemaining !== null && secondsRemaining > 0 ? (
            <Text
              style={styles.clock}
              accessibilityLabel={t("vote.live.remaining", {
                time: formatCountdown(secondsRemaining),
              })}
            >
              {formatCountdown(secondsRemaining)}
            </Text>
          ) : null}
          {secondsRemaining === 0 ? (
            <Text style={styles.caption}>{t("vote.live.timeUp")}</Text>
          ) : null}
        </View>
      </StaggerItem>

      {/* Ballots: how much of the squad has spoken. */}
      <StaggerItem index={1}>
        <View style={styles.ballotsCard}>
          <ProgressRing
            progress={ballots.length > 0 ? doneCount / ballots.length : 0}
            size={72}
            strokeWidth={7}
            color={theme.colors.primary.main}
            trackColor={theme.colors.grey[200]}
          >
            <Text style={styles.ringValue}>{doneCount}</Text>
          </ProgressRing>
          <View style={styles.ballotsText}>
            <Text style={styles.sectionTitle}>{t("vote.live.ballots")}</Text>
            <Text style={styles.ballotCount}>
              {t("vote.live.voted", { done: doneCount, total: ballots.length })}
              <Text style={styles.caption}> {t("vote.live.votedSuffix")}</Text>
            </Text>
            {ballots.length === 0 ? (
              <Text style={styles.caption}>{t("vote.live.nobody")}</Text>
            ) : (
              <AvatarStack
                size={30}
                max={8}
                players={ballots.map((ballot) => ({
                  id: ballot.player.id,
                  // Plain nickname: the monogram is built from it, and
                  // "(you)" would become an initial.
                  name: ballot.player.nickname,
                  avatarUrl: ballot.player.avatarUrl,
                  done: ballot.isComplete,
                }))}
              />
            )}
          </View>
        </View>
      </StaggerItem>

      <Text style={styles.sectionTitle}>{t("vote.live.tally")}</Text>
      {hasVotes ? (
        <View style={styles.rows}>
          {tally.map((row, index) => (
            <StaggerItem key={row.player.id} index={index + 2}>
              <TallyRow
                name={row.player.nickname}
                avatarUrl={row.player.avatarUrl}
                topCount={row.topCount}
                flopCount={row.flopCount}
                max={maxTallyCount}
              />
            </StaggerItem>
          ))}
        </View>
      ) : (
        <MascotBubble line={t("vote.live.emptyMascot")} />
      )}

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

      {isAdmin ? (
        <View style={styles.adminAction}>
          <Button
            text={t("vote.live.close")}
            isLoading={isClosing}
            onPress={handleClose}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}
