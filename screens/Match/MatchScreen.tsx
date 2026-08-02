// app/(team)/index.tsx
import { Text, View, TouchableOpacity } from "react-native";
import { createStyles } from "./Match.styles";
import MatchModal from "../../components/container/modalCreateMatch/modal";
import { useState } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatchScreenLogic } from "./MatchScreen.logic";

export default function MatchScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { handleModalOpen, handleModalClose, handleSaveMatch, modalVisible } =
    useMatchScreenLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Match </Text>
        <TouchableOpacity style={styles.fab} onPress={handleModalOpen}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        <MatchModal
          visible={modalVisible}
          onClose={handleModalClose}
          onSave={handleSaveMatch}
        />
      </View>
    </SafeAreaView>
  );
}
