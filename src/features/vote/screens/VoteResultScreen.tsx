import React, { useEffect, useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/buttons/button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { TallyRow } from "@/features/vote/components/TallyRow";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Glow } from "@/components/motion/Glow";
import { notifySuccess } from "@/components/motion/haptics";
import type { VoteTallyRow } from "@/features/vote/hooks/useVoteViewModel";
import { t } from "@/i18n";
import VoteHistoryScreen from "./VoteHistoryScreen";
import { createStyles } from "./VoteResult.styles";

interface VoteResultScreenProps {
  matchId: string;
  topName: string | null;
  topAvatarUrl?: string | null;
  flopName: string | null;
  flopAvatarUrl?: string | null;
  closedReasonLabel: string | null;
  tally: VoteTallyRow[];
  maxTallyCount: number;
}

/**
 * The verdict as a podium moment: the Top under a gold light, face first,
 * the Flop a step down in neutral with a kind word. The roast is affectionate,
 * so it never gets a colour of its own.
 */
export default function VoteResultScreen({
  matchId,
  topName,
  topAvatarUrl,
  flopName,
  flopAvatarUrl,
  closedReasonLabel,
  tally,
  maxTallyCount,
}: VoteResultScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const hasVerdict = Boolean(topName && flopName);

  useEffect(() => {
    if (hasVerdict) notifySuccess();
  }, [hasVerdict]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scroll}
      >
        {closedReasonLabel ? (
          <View style={styles.reasonPill}>
            <Text style={styles.reasonText}>{closedReasonLabel}</Text>
          </View>
        ) : null}

        {hasVerdict ? (
          <>
            <StaggerItem index={0} style={styles.stretch}>
              <View style={styles.winner}>
                <Glow
                  color={theme.colors.secondary.main}
                  size={320}
                  intensity={0.5}
                />
                <Text style={styles.verdictLabel}>{t("vote.result.top")}</Text>
                <View style={styles.winnerRing}>
                  <PlayerAvatar
                    name={topName ?? ""}
                    url={topAvatarUrl}
                    tone="gold"
                    size={104}
                  />
                </View>
                <Text style={styles.winnerName}>{topName}</Text>
              </View>
            </StaggerItem>

            <StaggerItem index={1} style={styles.stretch}>
              <View style={styles.flopCard}>
                <PlayerAvatar
                  name={flopName ?? ""}
                  url={flopAvatarUrl}
                  size={48}
                />
                <View style={styles.flopText}>
                  <Text style={styles.verdictLabelSmall}>
                    {t("vote.result.flop")}
                  </Text>
                  <Text style={styles.flopName}>{flopName}</Text>
                  <Text style={styles.consolation}>
                    {t("vote.result.consolation")}
                  </Text>
                </View>
              </View>
            </StaggerItem>
          </>
        ) : (
          <>
            <MascotBubble line={t("vote.result.noVerdictMascot")} />
            <Text style={styles.emptyText}>
              {t("vote.result.noVerdictText")}
            </Text>
          </>
        )}

        {tally.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>
              {t("vote.result.finalTally")}
            </Text>
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
          </>
        ) : null}

        <View style={styles.historyAction}>
          <Button
            text={t("vote.result.seeAll")}
            variant="secondary"
            onPress={async () => setIsHistoryOpen(true)}
          />
        </View>
      </ScrollView>

      <VoteHistoryScreen
        matchId={matchId}
        visible={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {hasVerdict ? (
        <View style={styles.confetti} pointerEvents="none">
          <ConfettiCannon
            count={90}
            origin={{ x: width / 2, y: -20 }}
            explosionSpeed={320}
            fallSpeed={2800}
            fadeOut
            autoStart
          />
        </View>
      ) : null}
    </View>
  );
}
