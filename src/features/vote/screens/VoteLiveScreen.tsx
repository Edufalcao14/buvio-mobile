import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/buttons/button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { TallyRow } from "@/features/vote/components/TallyRow";
import type {
  VoteBallotRow,
  VoteTallyRow,
} from "@/features/vote/hooks/useVoteViewModel";
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
 * The vote in flight: who has posted a ballot, what the running count says,
 * and how long is left. Everything here arrives over the subscription.
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
  const hasVotes = tally.some(
    (row) => row.topCount > 0 || row.flopCount > 0,
  );

  const handleClose = async () => {
    setErrorText(null);
    const failure = await onClose();

    if (failure) {
      setErrorText(failure);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Vote en cours</Text>

      {secondsRemaining !== null && secondsRemaining > 0 ? (
        <View
          style={styles.countdown}
          accessible
          accessibilityLabel={`Temps restant : ${formatCountdown(secondsRemaining)}`}
        >
          <Feather
            name="clock"
            size={16}
            color={theme.colors.primary.contrastText}
          />
          <Text style={styles.countdownText}>
            {formatCountdown(secondsRemaining)}
          </Text>
        </View>
      ) : null}

      {secondsRemaining === 0 ? (
        <Text style={styles.caption}>
          Le temps est écoulé, la clôture arrive.
        </Text>
      ) : null}

      <Text style={styles.sectionTitle}>Bulletins</Text>
      <Text style={styles.caption}>
        {`${doneCount} sur ${ballots.length} ont voté.`}
      </Text>
      {ballots.length === 0 ? (
        <Text style={styles.emptyText}>
          Personne n’est inscrit sur la feuille de match.
        </Text>
      ) : (
        <View style={styles.voters}>
          {ballots.map((ballot) => (
            <View
              key={ballot.player.id}
              style={[
                styles.voterChip,
                ballot.isComplete ? styles.voterChipDone : null,
              ]}
              accessible
              accessibilityLabel={`${ballot.player.nickname} ${
                ballot.isComplete ? "a voté" : "n’a pas encore voté"
              }`}
            >
              <Feather
                name={ballot.isComplete ? "check-circle" : "clock"}
                size={14}
                color={
                  ballot.isComplete
                    ? theme.colors.primary.light
                    : theme.colors.text.hint
                }
              />
              <Text
                style={[
                  styles.voterName,
                  ballot.isComplete ? null : styles.voterNamePending,
                ]}
              >
                {ballot.isMe
                  ? `${ballot.player.nickname} (toi)`
                  : ballot.player.nickname}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Décompte</Text>
      {hasVotes ? (
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
      ) : (
        <MascotBubble line="Zéro bulletin pour l’instant. Ça se joue au comptoir ?" />
      )}

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

      {isAdmin ? (
        <View style={styles.adminAction}>
          {/* The only action on this screen, so it takes the gold. */}
          <Button
            text="Clore le vote"
            isLoading={isClosing}
            onPress={handleClose}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}
