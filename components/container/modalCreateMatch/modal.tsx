import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { createStyles } from "./modal.style";
import { useCreateMatchModal } from "./CreateMatch.logic";
import { useTheme } from "../../../providers/ThemeProvider";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DatePicker from "../../inputs/DatePicker/DatePicker";
import { MatchType } from "../../../graphql/generated/hooks";
import { FormTextInput } from "../../inputs/formTextInput";

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
    getInitials,
    getTeamMembers,
    handleSubmit,
    resetForm,
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
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.modalContainer}>
                  {/* Header */}
                  <View style={styles.header}>
                    <TouchableOpacity
                      onPress={() => {
                        onClose();
                        resetForm();
                      }}
                    >
                      <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
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
                        <TouchableOpacity
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
                        </TouchableOpacity>

                        <TouchableOpacity
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
                        </TouchableOpacity>

                        <TouchableOpacity
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
                        </TouchableOpacity>
                      </View>
                      {errors.type && (
                        <Text style={styles.errorText}>
                          {errors.type.message}
                        </Text>
                      )}
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
                        Tous les membres de l'équipe sont automatiquement inclus
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
                            <View style={styles.playerAvatar}>
                              <Text style={styles.playerInitials}>
                                {getInitials(player.displayName)}
                              </Text>
                            </View>
                            <Text style={styles.playerName}>
                              {player.displayName}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </ScrollView>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.saveButtonText}>Créer le match</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default MatchModal;
