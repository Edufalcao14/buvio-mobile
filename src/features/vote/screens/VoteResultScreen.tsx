import React from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTheme } from "@/providers/ThemeProvider";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { VerdictArt } from "@/features/vote/components/VerdictArt";
import { TallyRow } from "@/features/vote/components/TallyRow";
import type { VoteTallyRow } from "@/features/vote/hooks/useVoteViewModel";
import { createStyles } from "./VoteResult.styles";

interface VoteResultScreenProps {
  topName: string | null;
  topAvatarUrl?: string | null;
  flopName: string | null;
  flopAvatarUrl?: string | null;
  closedReasonLabel: string | null;
  tally: VoteTallyRow[];
  maxTallyCount: number;
}

/**
 * The verdict. The Top gets the confetti and the gold medallion, the Flop
 * gets the same shape in neutral and a kind word — the roast is affectionate,
 * so it never gets a colour of its own (DESIGN.md).
 */
export default function VoteResultScreen({
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

  const hasVerdict = Boolean(topName && flopName);

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
            <View style={styles.verdictCard}>
              <Text style={styles.verdictLabel}>Top de la soirée</Text>
              <VerdictArt variant="top" />
              <PlayerAvatar
                name={topName ?? ""}
                url={topAvatarUrl}
                tone="gold"
                size={64}
              />
              <Text style={styles.winnerName}>{topName}</Text>
            </View>

            <View style={styles.verdictCard}>
              <Text style={styles.verdictLabel}>Flop de la soirée</Text>
              <VerdictArt variant="flop" size={120} />
              <PlayerAvatar name={flopName ?? ""} url={flopAvatarUrl} size={56} />
              <Text style={styles.flopName}>{flopName}</Text>
              <Text style={styles.consolation}>
                Bonne chance la prochaine fois 🍀
              </Text>
            </View>
          </>
        ) : (
          <>
            <MascotBubble line="Vote clos, et personne n’a tranché. Costaud." />
            <Text style={styles.emptyText}>
              Le vote est terminé sans verdict : il manquait des bulletins
              complets.
            </Text>
          </>
        )}

        {tally.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Décompte final</Text>
            <View style={styles.rows}>
              {tally.map((row) => (
                <TallyRow
                  key={row.player.id}
                  name={row.player.nickname}
                  avatarUrl={row.player.avatarUrl}
                  topCount={row.topCount}
                  flopCount={row.flopCount}
                  max={maxTallyCount}
                />
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>

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
