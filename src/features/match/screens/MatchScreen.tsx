import { Text, View, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { createStyles } from "./Match.styles";
import MatchModal from "@/features/match/components/modalCreateMatch/modal";
import { LiveVoteBanner } from "@/features/match/components/LiveVoteBanner";
import { MatchHistoryCard } from "@/features/match/components/matchHistoryCard/MatchHistoryCard";
import { useTheme } from "@/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatchViewModel } from "../hooks/useMatchViewModel";
import { useHistoryViewModel } from "../hooks/useHistoryViewModel";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { usePendingVoteViewModel } from "@/features/vote";
import { t } from "@/i18n";

/**
 * "Now and next": the live vote the squad owes, then the fixtures still to
 * come. The archive lives one tab over; this screen is only what is ahead.
 */
export default function MatchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { handleModalOpen, handleModalClose, modalVisible } =
    useMatchViewModel();
  const { pendingVote } = usePendingVoteViewModel();
  const { sections } = useHistoryViewModel();

  const upcoming = sections
    .flatMap((section) => section.data)
    .filter((match) => match.outcome.kind === "upcoming");

  // Never two gold actions on one screen: when the team owes a vote, voting
  // is *the* thing to do and the create-match FAB steps down to paper.
  const hasVoteCta = pendingVote !== null;
  const styles = createStyles(theme, hasVoteCta);
  const isEmpty = !pendingVote && upcoming.length === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      {isEmpty ? (
        <View style={styles.container}>
          <MascotBubble line={t("match.emptyMascot")} />
          <Text style={styles.emptyHint}>{t("match.emptyHint")}</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {pendingVote ? (
            <StaggerItem index={0}>
              <LiveVoteBanner
                matchName={pendingVote.matchName}
                onPress={() => router.push(`/vote/${pendingVote.matchId}`)}
              />
            </StaggerItem>
          ) : null}

          {upcoming.length > 0 ? (
            <StaggerItem index={1}>
              <Text style={styles.sectionTitle}>{t("match.upcoming")}</Text>
            </StaggerItem>
          ) : null}
          {upcoming.map((match, index) => (
            <StaggerItem key={match.id} index={index + 2}>
              <MatchHistoryCard match={match} />
            </StaggerItem>
          ))}
        </ScrollView>
      )}

      <Pressable
        style={styles.fab}
        onPress={handleModalOpen}
        accessibilityRole="button"
        accessibilityLabel={t("match.createA11y")}
      >
        <Feather
          name="plus"
          size={26}
          color={
            hasVoteCta
              ? theme.colors.text.primary
              : theme.colors.secondary.contrastText
          }
        />
      </Pressable>
      <MatchModal visible={modalVisible} onClose={handleModalClose} />
    </SafeAreaView>
  );
}
