import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { createStyles } from "./Match.styles";
import MatchModal from "@/features/match/components/modalCreateMatch/modal";
import { useTheme } from "@/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatchViewModel } from "../hooks/useMatchViewModel";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { usePendingVoteViewModel } from "@/features/vote";

export default function MatchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { handleModalOpen, handleModalClose, modalVisible } =
    useMatchViewModel();
  const { pendingVote } = usePendingVoteViewModel();

  // Never two gold actions on one screen: when the team owes a vote, voting
  // is *the* thing to do and the create-match FAB steps down to green.
  const hasVoteCta = pendingVote !== null;
  const styles = createStyles(theme, hasVoteCta);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MascotBubble line="Toujours pas de match ? Le chopp va chauffer…" />
        <Text style={styles.emptyHint}>
          Créez un match avec le bouton + pour lancer la prochaine rencontre.
        </Text>

        {hasVoteCta ? (
          <Pressable
            style={styles.votePill}
            onPress={() => router.push(`/vote/${pendingVote.matchId}`)}
            accessibilityRole="button"
            accessibilityLabel={`Voter pour ${pendingVote.matchName}`}
          >
            <Text style={styles.votePillText}>Voter 🗳️</Text>
          </Pressable>
        ) : null}

        <Pressable
          style={styles.fab}
          onPress={handleModalOpen}
          accessibilityRole="button"
          accessibilityLabel="Créer un match"
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
        <MatchModal visible={modalVisible} onClose={handleModalClose} />
      </View>
    </SafeAreaView>
  );
}
