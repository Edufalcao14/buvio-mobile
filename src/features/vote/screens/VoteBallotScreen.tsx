import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/buttons/button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { PlayerChoiceCard } from "@/features/vote/components/PlayerChoiceCard";
import type {
  BallotOutcome,
  VotePlayer,
} from "@/features/vote/hooks/useVoteViewModel";
import { createStyles } from "./VoteBallot.styles";

const COMMENT_MAX_LENGTH = 256;

type Step = "top" | "flop" | "confirm";

interface VoteBallotScreenProps {
  eligibleForTop: VotePlayer[];
  eligibleForFlop: (topPlayerId: string | null) => VotePlayer[];
  isSubmitting: boolean;
  onSubmit: (
    topId: string,
    topComment: string,
    flopId: string,
    flopComment: string
  ) => Promise<BallotOutcome>;
}

const nameOf = (players: VotePlayer[], id: string | null) =>
  players.find((player) => player.id === id)?.nickname ?? "";

/**
 * The ballot itself: Top, then Flop, then one confirmation that sends both.
 * The steps slide in the direction of travel so going back reads as going
 * back.
 */
export default function VoteBallotScreen({
  eligibleForTop,
  eligibleForFlop,
  isSubmitting,
  onSubmit,
}: VoteBallotScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [step, setStep] = useState<Step>("top");
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [topId, setTopId] = useState<string | null>(null);
  const [topComment, setTopComment] = useState("");
  const [flopId, setFlopId] = useState<string | null>(null);
  const [flopComment, setFlopComment] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isTopRecorded, setIsTopRecorded] = useState(false);

  const flopCandidates = eligibleForFlop(topId);

  const goTo = (next: Step) => {
    setIsGoingBack(
      (next === "top" && step !== "top") ||
        (next === "flop" && step === "confirm")
    );
    setStep(next);
  };

  const selectTop = (playerId: string) => {
    setTopId(playerId);

    // Crowning the player already picked as Flop would leave an impossible
    // ballot behind; the Flop simply goes back to unchosen.
    if (flopId === playerId) {
      setFlopId(null);
    }
  };

  const handleSubmit = async () => {
    if (!topId || !flopId) {
      return;
    }

    setErrorText(null);
    const outcome = await onSubmit(topId, topComment, flopId, flopComment);

    if (outcome.status === "topOnly") {
      setIsTopRecorded(true);
      setErrorText(
        `Ton Top a bien été enregistré, mais le Flop n’est pas passé. ${outcome.message}`
      );
      return;
    }

    if (outcome.status === "failed") {
      setErrorText(outcome.message);
    }
    // On success the session state changes and the parent screen moves on.
  };

  if (eligibleForTop.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <MascotBubble line="Tout seul dans le vestiaire, c’est dur de voter…" />
          <Text style={styles.emptyText}>
            Il faut au moins deux joueurs sur la feuille de match pour voter.
          </Text>
        </ScrollView>
      </View>
    );
  }

  const entering = isGoingBack ? FadeInLeft : FadeInRight;
  const exiting = isGoingBack ? FadeOutRight : FadeOutLeft;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {step === "top" ? (
          <Animated.View
            key="top"
            entering={entering.duration(240)}
            exiting={exiting.duration(180)}
            style={styles.cards}
          >
            <Text style={styles.stepMarker}>Étape 1 sur 2</Text>
            <Text style={styles.title}>Qui a été le TOP ? 👑</Text>
            <Text style={styles.subtitle}>
              Un seul choix. Tu ne peux pas te voter toi-même.
            </Text>
            <View style={styles.cards}>
              {eligibleForTop.map((player) => (
                <PlayerChoiceCard
                  key={player.id}
                  name={player.nickname}
                  avatarUrl={player.avatarUrl}
                  isSelected={player.id === topId}
                  onPress={() => selectTop(player.id)}
                />
              ))}
            </View>
            <View style={styles.commentBlock}>
              <Text style={styles.commentLabel}>Un mot pour le Top ?</Text>
              <TextInput
                style={styles.commentInput}
                value={topComment}
                onChangeText={setTopComment}
                placeholder="Optionnel"
                placeholderTextColor={theme.colors.text.hint}
                multiline
                maxLength={COMMENT_MAX_LENGTH}
                accessibilityLabel="Commentaire pour le Top"
              />
              <Text style={styles.counter}>
                {topComment.length}/{COMMENT_MAX_LENGTH}
              </Text>
            </View>
          </Animated.View>
        ) : null}

        {step === "flop" ? (
          <Animated.View
            key="flop"
            entering={entering.duration(240)}
            exiting={exiting.duration(180)}
            style={styles.cards}
          >
            <Text style={styles.stepMarker}>Étape 2 sur 2</Text>
            <Text style={styles.title}>Et le FLOP ? 💩</Text>
            <Text style={styles.subtitle}>
              {`Ton Top, ${nameOf(eligibleForTop, topId)}, n’est plus dans la liste.`}
            </Text>
            <View style={styles.cards}>
              {flopCandidates.map((player) => (
                <PlayerChoiceCard
                  key={player.id}
                  name={player.nickname}
                  avatarUrl={player.avatarUrl}
                  isSelected={player.id === flopId}
                  onPress={() => setFlopId(player.id)}
                />
              ))}
            </View>
            {flopCandidates.length === 0 ? (
              <Text style={styles.emptyText}>
                Aucun autre joueur à désigner : il faut un troisième joueur sur
                la feuille de match.
              </Text>
            ) : null}
            <View style={styles.commentBlock}>
              <Text style={styles.commentLabel}>Un mot pour le Flop ?</Text>
              <TextInput
                style={styles.commentInput}
                value={flopComment}
                onChangeText={setFlopComment}
                placeholder="Optionnel"
                placeholderTextColor={theme.colors.text.hint}
                multiline
                maxLength={COMMENT_MAX_LENGTH}
                accessibilityLabel="Commentaire pour le Flop"
              />
              <Text style={styles.counter}>
                {flopComment.length}/{COMMENT_MAX_LENGTH}
              </Text>
            </View>
          </Animated.View>
        ) : null}

        {step === "confirm" ? (
          <Animated.View
            key="confirm"
            entering={entering.duration(240)}
            exiting={exiting.duration(180)}
            style={styles.cards}
          >
            <Text style={styles.stepMarker}>Récapitulatif</Text>
            <Text style={styles.title}>On envoie ?</Text>
            <Text style={styles.subtitle}>
              Le vote part en une fois et ne peut plus être modifié.
            </Text>
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Top 👑</Text>
                <Text style={styles.summaryName}>
                  {nameOf(eligibleForTop, topId)}
                </Text>
              </View>
              {topComment.trim().length > 0 ? (
                <Text style={styles.summaryComment}>
                  {`« ${topComment.trim()} »`}
                </Text>
              ) : null}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Flop 💩</Text>
                <Text style={styles.summaryName}>
                  {nameOf(eligibleForTop, flopId)}
                </Text>
              </View>
              {flopComment.trim().length > 0 ? (
                <Text style={styles.summaryComment}>
                  {`« ${flopComment.trim()} »`}
                </Text>
              ) : null}
            </View>
            {errorText ? (
              <Text style={styles.errorText}>{errorText}</Text>
            ) : null}
            {isTopRecorded ? (
              <Text style={styles.subtitle}>
                Renvoyer le vote ne changera pas le Top déjà enregistré.
              </Text>
            ) : null}
          </Animated.View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        {step === "top" ? (
          <Button
            text="Continuer"
            disabled={!topId}
            onPress={async () => goTo("flop")}
          />
        ) : null}
        {step === "flop" ? (
          <Button
            text="Continuer"
            disabled={!flopId}
            onPress={async () => goTo("confirm")}
          />
        ) : null}
        {step === "confirm" ? (
          <Button
            text={isTopRecorded ? "Renvoyer mon vote" : "Envoyer mon vote"}
            isLoading={isSubmitting}
            onPress={handleSubmit}
          />
        ) : null}
        {step === "top" ? null : (
          <Pressable
            style={styles.secondaryAction}
            onPress={() => goTo(step === "confirm" ? "flop" : "top")}
            accessibilityRole="button"
            accessibilityLabel="Revenir à l’étape précédente"
          >
            <Text style={styles.secondaryActionText}>Retour</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
