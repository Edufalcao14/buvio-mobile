import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { createStyles } from "./modal.style";
import { useCreateMatchModal } from "./CreateMatch.logic";
import { useTheme } from "@/providers/ThemeProvider";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DatePicker from "@/components/inputs/DatePicker/DatePicker";
import { MatchType } from "@/graphql/generated/hooks";
import { FormTextInput } from "@/components/inputs/formTextInput";
import { Button } from "@/components/buttons/button";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { nicknameOf } from "@/utils/identity";

interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ visible = true, onClose }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const {
    control,
    errors,
    matchType,
    showCalendar,
    setShowCalendar,
    handleTypeSelection,
    getTeamMembers,
    handleSubmit,
    resetForm,
    isCreating,
  } = useCreateMatchModal(onClose);

  const teamMembers = getTeamMembers?.getTeamMembers || [];
  const displayTeamMembers = teamMembers.slice(0, 3);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "right", "left"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <Pressable onPress={onClose} style={styles.modalOverlay}>
              <Pressable
                onPress={(e) => e.stopPropagation()}
                style={styles.modalContainer}
              >
                  {/* Header */}
                  <View style={styles.header}>
                    <Pressable
                      onPress={() => {
                        onClose();
                        resetForm();
                      }}
                      hitSlop={12}
                      accessibilityRole="button"
                      accessibilityLabel="Fermer"
                    >
                      <AntDesign
                        name="arrow-left"
                        size={24}
                        color={theme.colors.primary.contrastText}
                      />
                    </Pressable>
                    <Text style={styles.headerTitle}>Créer un Match</Text>
                    <View style={styles.headerSpacer} />
                  </View>

                  <ScrollView
                    style={styles.formContainer}
                    contentContainerStyle={styles.scrollContent}
                  >
                    <Text style={styles.formTitle}>Nouveau match</Text>
                    <Text style={styles.formSubtitle}>
                      Remplissez les informations pour créer un nouveau match
                      avec votre équipe.
                    </Text>

                    {/* Match Name */}
                    <View style={styles.sectionGroup}>
                      <FormTextInput
                        control={control}
                        errors={errors}
                        name="name"
                        label="Nom du match"
                        placeHolder="Ex: Match du dimanche"
                      />
                    </View>

                    {/* Match Type */}
                    <View style={styles.sectionGroup}>
                      <Text style={styles.inputLabel}>Type de match</Text>
                      <View style={styles.buttonGroup}>
                        <Pressable
                          style={[
                            styles.typeButton,
                            matchType === MatchType.Amical &&
                              styles.selectedTypeButton,
                          ]}
                          onPress={() => handleTypeSelection(MatchType.Amical)}
                        >
                          <Text
                            style={[
                              styles.typeButtonText,
                              matchType === MatchType.Amical &&
                                styles.selectedTypeText,
                            ]}
                          >
                            Amical
                          </Text>
                        </Pressable>

                        <Pressable
                          style={[
                            styles.typeButton,
                            matchType === MatchType.Tournoi &&
                              styles.selectedTypeButton,
                          ]}
                          onPress={() => handleTypeSelection(MatchType.Tournoi)}
                        >
                          <Text
                            style={[
                              styles.typeButtonText,
                              matchType === MatchType.Tournoi &&
                                styles.selectedTypeText,
                            ]}
                          >
                            Tournoi
                          </Text>
                        </Pressable>

                        <Pressable
                          style={[
                            styles.typeButton,
                            matchType === MatchType.Championnat &&
                              styles.selectedTypeButton,
                          ]}
                          onPress={() =>
                            handleTypeSelection(MatchType.Championnat)
                          }
                        >
                          <Text
                            style={[
                              styles.typeButtonText,
                              matchType === MatchType.Championnat &&
                                styles.selectedTypeText,
                            ]}
                          >
                            Championnat
                          </Text>
                        </Pressable>
                      </View>
                      {errors.type ? <Text style={styles.errorText}>
                          {errors.type.message}
                        </Text> : null}
                    </View>

                    {/* Match Date */}
                    <Controller
                      control={control}
                      name="date"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <DatePicker
                          label="Date du match"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={errors.date?.message}
                          showCalendar={showCalendar}
                          setShowCalendar={setShowCalendar}
                        />
                      )}
                    />

                    {/* Players Section */}
                    <View style={styles.playersSection}>
                      <View style={styles.playersSectionHeader}>
                        <Text style={styles.playersTitle}>Joueurs</Text>
                        <Text style={styles.playersCount}>
                          {teamMembers.length || 0} joueurs
                        </Text>
                      </View>
                      <Text style={styles.playersSubtitle}>
                        Tous les membres de l’équipe sont automatiquement inclus
                        comme joueurs.
                      </Text>

                      {/* Player List */}
                      <View style={styles.playerList}>
                        {displayTeamMembers.map((player, index) => (
                          <View
                            key={player.id}
                            style={[
                              styles.playerItem,
                              index === displayTeamMembers.length - 1 &&
                                styles.lastPlayerItem,
                            ]}
                          >
                            <PlayerAvatar
                              name={nicknameOf(player)}
                              url={player.avatarUrl}
                              size={36}
                            />
                            <Text style={styles.playerName}>
                              {nicknameOf(player)}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </ScrollView>

                  <View style={styles.buttonContainer}>
                    <Button
                      text="Créer le match"
                      onPress={handleSubmit}
                      isLoading={isCreating}
                    />
                  </View>
              </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default MatchModal;
