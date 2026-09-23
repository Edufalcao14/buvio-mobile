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
import { t } from "@/i18n";
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

/** Two segments that fill as the ballot advances: the whole progress UI. */
const StepBar: React.FC<{
  step: Step;
  styles: ReturnType<typeof createStyles>;
}> = ({ step, styles }) => {
  const filled = step === "top" ? 1 : step === "flop" ? 2 : 2;
  return (
    <View style={styles.stepBar} accessibilityElementsHidden>
      <View style={[styles.stepSegment, filled >= 1 && styles.stepSegmentOn]} />
      <View style={[styles.stepSegment, filled >= 2 && styles.stepSegmentOn]} />
    </View>
  );
};

/**
 * The ballot itself: Top, then Flop, then one confirmation that sends both.
 * Candidates are a grid of faces; the steps slide in the direction of travel
 * so going back reads as going back.
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
    if (flopId === playerId) setFlopId(null);
  };

  const handleSubmit = async () => {
    if (!topId || !flopId) return;
    setErrorText(null);
    const outcome = await onSubmit(topId, topComment, flopId, flopComment);
    if (outcome.status === "topOnly") {
      setIsTopRecorded(true);
      setErrorText(t("vote.ballot.topOnly", { message: outcome.message }));
      return;
    }
    if (outcome.status === "failed") setErrorText(outcome.message);
  };

  if (eligibleForTop.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <MascotBubble line={t("vote.ballot.aloneMascot")} />
          <Text style={styles.emptyText}>{t("vote.ballot.aloneText")}</Text>
        </ScrollView>
      </View>
    );
  }

  const entering = isGoingBack ? FadeInLeft : FadeInRight;
  const exiting = isGoingBack ? FadeOutRight : FadeOutLeft;

  const comment = (
    label: string,
    a11y: string,
    value: string,
    onChange: (text: string) => void
  ) => (
    <View style={styles.commentBlock}>
      <Text style={styles.commentLabel}>{label}</Text>
      <TextInput
        style={styles.commentInput}
        value={value}
        onChangeText={onChange}
        placeholder={t("vote.ballot.commentPlaceholder")}
        placeholderTextColor={theme.colors.text.hint}
        multiline
        maxLength={COMMENT_MAX_LENGTH}
        accessibilityLabel={a11y}
      />
      <Text style={styles.counter}>
        {value.length}/{COMMENT_MAX_LENGTH}
      </Text>
    </View>
  );

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
        <StepBar step={step} styles={styles} />

        {step === "top" ? (
          <Animated.View
            key="top"
            entering={entering.duration(240)}
            exiting={exiting.duration(180)}
            style={styles.section}
          >
            <Text style={styles.stepMarker}>{t("vote.ballot.step1")}</Text>
            <Text style={styles.title}>{t("vote.ballot.topTitle")}</Text>
            <Text style={styles.subtitle}>{t("vote.ballot.topSubtitle")}</Text>
            <View style={styles.grid}>
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
            {comment(
              t("vote.ballot.topComment"),
              t("vote.ballot.topCommentA11y"),
              topComment,
              setTopComment
            )}
          </Animated.View>
        ) : null}

        {step === "flop" ? (
          <Animated.View
            key="flop"
            entering={entering.duration(240)}
            exiting={exiting.duration(180)}
            style={styles.section}
          >
            <Text style={styles.stepMarker}>{t("vote.ballot.step2")}</Text>
            <Text style={styles.title}>{t("vote.ballot.flopTitle")}</Text>
            <Text style={styles.subtitle}>
              {t("vote.ballot.flopSubtitle", {
                name: nameOf(eligibleForTop, topId),
              })}
            </Text>
            <View style={styles.grid}>
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
              <Text style={styles.emptyText}>{t("vote.ballot.noOther")}</Text>
            ) : null}
            {comment(
              t("vote.ballot.flopComment"),
              t("vote.ballot.flopCommentA11y"),
              flopComment,
              setFlopComment
            )}
          </Animated.View>
        ) : null}

        {step === "confirm" ? (
          <Animated.View
            key="confirm"
            entering={entering.duration(240)}
            exiting={exiting.duration(180)}
            style={styles.section}
          >
            <Text style={styles.stepMarker}>{t("vote.ballot.recap")}</Text>
            <Text style={styles.title}>{t("vote.ballot.send")}</Text>
            <Text style={styles.subtitle}>{t("vote.ballot.sendSubtitle")}</Text>
            <View style={styles.summary}>
              <View style={[styles.summaryRow, styles.summaryRowTop]}>
                <Text style={styles.summaryLabel}>{t("common.top")}</Text>
                <Text style={styles.summaryName}>
                  {nameOf(eligibleForTop, topId)}
                </Text>
              </View>
              {topComment.trim().length > 0 ? (
                <Text
                  style={styles.summaryComment}
                >{`« ${topComment.trim()} »`}</Text>
              ) : null}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t("common.flop")}</Text>
                <Text style={styles.summaryName}>
                  {nameOf(eligibleForTop, flopId)}
                </Text>
              </View>
              {flopComment.trim().length > 0 ? (
                <Text
                  style={styles.summaryComment}
                >{`« ${flopComment.trim()} »`}</Text>
              ) : null}
            </View>
            {errorText ? (
              <Text style={styles.errorText}>{errorText}</Text>
            ) : null}
            {isTopRecorded ? (
              <Text style={styles.subtitle}>
                {t("vote.ballot.resubmitNote")}
              </Text>
            ) : null}
          </Animated.View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        {step === "top" ? (
          <Button
            text={t("common.continue")}
            disabled={!topId}
            onPress={async () => goTo("flop")}
          />
        ) : null}
        {step === "flop" ? (
          <Button
            text={t("common.continue")}
            disabled={!flopId}
            onPress={async () => goTo("confirm")}
          />
        ) : null}
        {step === "confirm" ? (
          <Button
            text={
              isTopRecorded
                ? t("vote.ballot.resubmit")
                : t("vote.ballot.submit")
            }
            isLoading={isSubmitting}
            onPress={handleSubmit}
          />
        ) : null}
        {step === "top" ? null : (
          <Pressable
            style={styles.secondaryAction}
            onPress={() => goTo(step === "confirm" ? "flop" : "top")}
            accessibilityRole="button"
            accessibilityLabel={t("vote.ballot.backA11y")}
          >
            <Text style={styles.secondaryActionText}>{t("common.back")}</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
