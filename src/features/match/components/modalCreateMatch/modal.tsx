import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createStyles } from "./modal.styles";
import { useCreateMatchViewModel } from "@/features/match/hooks/useCreateMatchViewModel";
import { useTheme } from "@/providers/ThemeProvider";
import { MatchType } from "@/graphql/generated/hooks";
import { Button } from "@/components/buttons/button";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { AvatarStack } from "@/components/avatars/AvatarStack";
import { tapSelection } from "@/components/motion/haptics";
import { nicknameOf } from "@/utils/identity";
import { t } from "@/i18n";
import { DateChips } from "./DateChips";

const MATCH_TYPE_SEGMENTS: { type: MatchType; label: string }[] = [
  { type: MatchType.Amical, label: t("history.types.amical") },
  { type: MatchType.Tournoi, label: t("history.types.tournoi") },
  { type: MatchType.Championnat, label: t("history.types.championnat") },
];

interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * The match form as a native sheet: one big headline field for the name,
 * the platform's segmented control for the type, the week as a row of date
 * chips, the roster as an avatar stack, and the one gold action pinned to the
 * thumb. Nothing to scroll through on a normal night.
 */
const MatchModal: React.FC<MatchModalProps> = ({ visible = true, onClose }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const {
    control,
    errors,
    matchType,
    handleTypeSelection,
    getTeamMembers,
    handleSubmit,
    resetForm,
    isCreating,
  } = useCreateMatchViewModel(onClose);

  const teamMembers = getTeamMembers?.getTeamMembers || [];

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "right", "left"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>
                  {t("match.create.header")}
                </Text>
                <Pressable
                  onPress={() => {
                    onClose();
                    resetForm();
                  }}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel={t("common.close")}
                  style={styles.closeButton}
                >
                  <Feather
                    name="x"
                    size={20}
                    color={theme.colors.text.primary}
                  />
                </Pressable>
              </View>

              <ScrollView
                style={styles.formContainer}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.formTitle}>{t("match.create.title")}</Text>

                {/* The name is the headline of the night: set in display type,
                    no box around it, the hairline underneath is the field. */}
                <View style={styles.sectionGroup}>
                  <Text style={styles.inputLabel}>
                    {t("match.create.name")}
                  </Text>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        testID="input-name"
                        style={[
                          styles.nameInput,
                          errors.name && styles.nameInputError,
                        ]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={t("match.create.namePlaceholder")}
                        placeholderTextColor={theme.colors.grey[500]}
                        selectionColor={theme.colors.secondary.main}
                        autoCapitalize="sentences"
                        returnKeyType="done"
                      />
                    )}
                  />
                  {errors.name ? (
                    <Text style={styles.errorText}>{errors.name.message}</Text>
                  ) : null}
                </View>

                <View style={styles.sectionGroup}>
                  <Text style={styles.inputLabel}>
                    {t("match.create.type")}
                  </Text>
                  <SegmentedControl
                    values={MATCH_TYPE_SEGMENTS.map((segment) => segment.label)}
                    selectedIndex={Math.max(
                      0,
                      MATCH_TYPE_SEGMENTS.findIndex(
                        (segment) => segment.type === matchType
                      )
                    )}
                    onChange={(event) => {
                      const segment =
                        MATCH_TYPE_SEGMENTS[
                          event.nativeEvent.selectedSegmentIndex
                        ];
                      if (segment) {
                        tapSelection();
                        handleTypeSelection(segment.type);
                      }
                    }}
                    appearance="dark"
                    backgroundColor={theme.colors.background.paper}
                    tintColor={theme.colors.secondary.main}
                    fontStyle={{
                      color: theme.colors.text.secondary,
                      fontSize: theme.typography.fontSize.sm,
                    }}
                    activeFontStyle={{
                      color: theme.colors.secondary.contrastText,
                      fontWeight: "700",
                      fontSize: theme.typography.fontSize.sm,
                    }}
                    style={styles.segmented}
                  />
                  {errors.type ? (
                    <Text style={styles.errorText}>{errors.type.message}</Text>
                  ) : null}
                </View>

                <View style={styles.sectionGroup}>
                  <Text style={styles.inputLabel}>
                    {t("match.create.date")}
                  </Text>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                      <DateChips
                        value={value}
                        onChange={onChange}
                        error={errors.date?.message}
                      />
                    )}
                  />
                </View>

                <View style={styles.sectionGroup}>
                  <View style={styles.playersSectionHeader}>
                    <Text style={styles.inputLabel}>
                      {t("match.create.players")}
                    </Text>
                    <Text style={styles.playersCount}>
                      {t("common.players", { count: teamMembers.length })}
                    </Text>
                  </View>
                  <View style={styles.roster}>
                    <AvatarStack
                      players={teamMembers.map((player) => ({
                        id: player.id,
                        name: nicknameOf(player),
                        avatarUrl: player.avatarUrl,
                      }))}
                      max={7}
                      size={40}
                    />
                    <Text style={styles.playersSubtitle}>
                      {t("match.create.playersHint")}
                    </Text>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.buttonContainer}>
                <Button
                  text={t("match.create.submit")}
                  onPress={handleSubmit}
                  isLoading={isCreating}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default MatchModal;
