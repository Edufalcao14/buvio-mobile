import React from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SectionList,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/buttons/button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { useVoteHistoryViewModel } from "@/features/vote/hooks/useVoteHistoryViewModel";
import type {
  VoteHistoryEntry,
  VoteHistoryGroup,
} from "@/features/vote/hooks/useVoteHistoryViewModel";
import { createStyles } from "./VoteHistory.styles";

interface VoteHistoryScreenProps {
  matchId: string;
  visible: boolean;
  onClose: () => void;
}

const TOP_EMOJI = "👑";
const FLOP_EMOJI = "💩";

/**
 * Every ballot of a closed match, grouped by the player it was cast for.
 *
 * The result screen answers "who won"; this answers "what was actually said".
 * The comments are the point, so each row leads with the voter and lets the
 * sentence take the width; a vote without one says so rather than collapsing.
 *
 * Virtualised (`SectionList`) because a full squad produces two votes per
 * player and the list has to stay smooth at any roster size.
 */
export default function VoteHistoryScreen({
  matchId,
  visible,
  onClose,
}: VoteHistoryScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { groups, totalVotes, isEmpty, isLoading, errorMessage, refetch } =
    useVoteHistoryViewModel(matchId, visible);

  const sections = groups.map((group) => ({ group, data: group.entries }));

  const renderHeader = (group: VoteHistoryGroup) => (
    <View
      style={styles.groupHeader}
      accessible
      accessibilityLabel={`Votes pour ${group.player.nickname} : ${group.topCount} top, ${group.flopCount} flop`}
    >
      <PlayerAvatar
        name={group.player.nickname}
        url={group.player.avatarUrl}
        size={40}
      />
      <Text style={styles.groupName} numberOfLines={1}>
        {group.player.nickname}
      </Text>
      {group.topCount > 0 ? (
        <View style={styles.countPill}>
          <Text style={styles.emoji}>{TOP_EMOJI}</Text>
          <Text style={styles.countText}>{group.topCount}</Text>
        </View>
      ) : null}
      {group.flopCount > 0 ? (
        <View style={styles.countPill}>
          <Text style={styles.emoji}>{FLOP_EMOJI}</Text>
          <Text style={styles.countText}>{group.flopCount}</Text>
        </View>
      ) : null}
    </View>
  );

  const renderEntry = (entry: VoteHistoryEntry) => {
    const verdict = entry.kind === "top" ? "Top" : "Flop";
    const emoji = entry.kind === "top" ? TOP_EMOJI : FLOP_EMOJI;

    return (
      <View
        style={styles.entry}
        accessible
        accessibilityLabel={
          `${entry.voter.nickname} a donné un ${verdict} à ${entry.voted.nickname}. ` +
          (entry.comment ?? "Sans commentaire.")
        }
      >
        <PlayerAvatar
          name={entry.voter.nickname}
          url={entry.voter.avatarUrl}
          size={36}
        />
        <View style={styles.entryBody}>
          <View style={styles.entryLine}>
            <Text style={styles.voterName} numberOfLines={1}>
              {entry.voter.nickname}
            </Text>
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={styles.verdictWord} numberOfLines={1}>
              {`${verdict} pour ${entry.voted.nickname}`}
            </Text>
          </View>
          {entry.comment ? (
            <Text style={styles.comment}>{entry.comment}</Text>
          ) : (
            <Text style={styles.noComment}>Sans commentaire</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fermer"
          >
            <Feather
              name="x"
              size={24}
              color={theme.colors.primary.contrastText}
            />
          </Pressable>
          <Text style={styles.topBarTitle} numberOfLines={1}>
            Tous les votes
          </Text>
        </View>

        <View style={styles.body}>
          {isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator
                size="large"
                color={theme.colors.primary.light}
              />
            </View>
          ) : null}

          {!isLoading && errorMessage ? (
            <View style={styles.centered}>
              <Text style={styles.stateText}>{errorMessage}</Text>
              <View style={styles.action}>
                <Button
                  text="Réessayer"
                  variant="secondary"
                  onPress={async () => {
                    await refetch();
                  }}
                />
              </View>
            </View>
          ) : null}

          {!isLoading && !errorMessage && isEmpty ? (
            <View style={styles.centered}>
              <MascotBubble line="Vote clos, bulletins vides. Silence radio." />
              <Text style={styles.stateText}>
                Personne n’a voté sur ce match : il n’y a rien à raconter.
              </Text>
            </View>
          ) : null}

          {!isLoading && !errorMessage && !isEmpty ? (
            <SectionList
              sections={sections}
              keyExtractor={(entry) => entry.id}
              contentContainerStyle={styles.list}
              stickySectionHeadersEnabled={false}
              ListHeaderComponent={
                <Text style={styles.caption}>
                  {totalVotes > 1
                    ? `${totalVotes} votes, commentaires compris.`
                    : `${totalVotes} vote, commentaire compris.`}
                </Text>
              }
              renderSectionHeader={({ section }) => renderHeader(section.group)}
              renderItem={({ item }) => renderEntry(item)}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
