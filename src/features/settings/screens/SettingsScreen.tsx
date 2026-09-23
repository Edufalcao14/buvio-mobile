import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import Header from "@/components/navigation/header/header";
import { TeamCrest } from "@/components/navigation/header/TeamCrest";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { PicturePicker } from "@/components/avatars/PicturePicker";
import { FormTextInput } from "@/components/inputs/formTextInput";
import { Button } from "@/components/buttons/button";
import { useSettingsViewModel } from "../hooks/useSettingsViewModel";
import { createStyles } from "./Settings.styles";
import { t } from "@/i18n";

export default function SettingsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {
    email,
    squadName,
    avatarUrl,
    control,
    errors,
    isDirty,
    isSavingProfile,
    profileError,
    saveProfile,
    isUploadingAvatar,
    avatarError,
    changeAvatar,
    isTeamCreator,
    isUploadingCrest,
    crestError,
    changeCrest,
    team,
    copyCode,
    shareCode,
    confirmLogout,
    isDeletingAccount,
    confirmDeleteAccount,
    goBack,
  } = useSettingsViewModel();

  return (
    <View style={styles.screen}>
      <Header title={t("settings.title")} handlerBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t("settings.player")}</Text>

          <View style={styles.form}>
            <PicturePicker
              label={t("settings.photo")}
              accessibilityLabel={t("settings.photoA11y")}
              actionLabel={
                avatarUrl ? t("settings.changePhoto") : t("settings.addPhoto")
              }
              isBusy={isUploadingAvatar}
              onPress={changeAvatar}
              errorText={avatarError}
              preview={
                <PlayerAvatar
                  name={squadName ?? ""}
                  url={avatarUrl}
                  size={44}
                />
              }
            />

            <FormTextInput
              control={control}
              errors={errors}
              label={t("settings.fullName")}
              placeHolder={t("settings.fullNamePlaceholder")}
              name="displayName"
            />

            <FormTextInput
              control={control}
              errors={errors}
              label={t("settings.nickname")}
              placeHolder={t("settings.nicknamePlaceholder")}
              name="nickname"
            />
            <Text style={styles.fieldHint}>{t("settings.nicknameHint")}</Text>

            <View style={styles.emailRow}>
              <Text style={styles.emailLabel}>{t("settings.email")}</Text>
              <Text style={styles.emailValue}>{email ?? t("common.dash")}</Text>
            </View>

            {profileError ? (
              <Text style={styles.errorText}>{profileError}</Text>
            ) : null}

            {/* The only gold action on this screen (see DESIGN.md). */}
            <View style={styles.saveAction}>
              <Button
                text={t("settings.save")}
                isLoading={isSavingProfile}
                disabled={!isDirty}
                onPress={saveProfile}
              />
            </View>
          </View>
        </View>

        {team ? (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>{t("settings.team")}</Text>
            <View style={styles.teamRow}>
              <TeamCrest name={team.name} url={team.crestUrl} size={52} />
              <View style={styles.teamText}>
                <Text style={styles.primaryValue}>{team.name}</Text>
                {team.sport ? (
                  <Text style={styles.secondaryValue}>{team.sport}</Text>
                ) : null}
              </View>
            </View>

            {isTeamCreator ? (
              <View style={styles.crestPicker}>
                <PicturePicker
                  label={t("settings.crest")}
                  accessibilityLabel={t("settings.crestA11y")}
                  actionLabel={
                    team.crestUrl
                      ? t("settings.changeCrest")
                      : t("settings.addCrest")
                  }
                  hint={t("settings.crestHint")}
                  isBusy={isUploadingCrest}
                  onPress={changeCrest}
                  errorText={crestError}
                  preview={
                    <TeamCrest name={team.name} url={team.crestUrl} size={44} />
                  }
                />
              </View>
            ) : null}

            <View style={styles.codeBlock}>
              <Text style={styles.codeLabel}>{t("settings.inviteCode")}</Text>
              <Text style={styles.codeValue}>{team.code}</Text>
              <Text style={styles.codeHint}>{t("settings.inviteHint")}</Text>

              <View style={styles.codeActions}>
                <Pressable
                  onPress={copyCode}
                  style={({ pressed }) => [
                    styles.codeAction,
                    pressed && styles.codeActionPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={t("settings.copyA11y")}
                >
                  <Feather
                    name="copy"
                    size={16}
                    color={theme.colors.primary.light}
                  />
                  <Text style={styles.codeActionText}>
                    {t("settings.copy")}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={shareCode}
                  style={({ pressed }) => [
                    styles.codeAction,
                    pressed && styles.codeActionPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={t("settings.shareA11y")}
                >
                  <Feather
                    name="share-2"
                    size={16}
                    color={theme.colors.primary.light}
                  />
                  <Text style={styles.codeActionText}>
                    {t("settings.share")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : null}

        <Pressable
          onPress={confirmLogout}
          style={({ pressed }) => [
            styles.logout,
            pressed && styles.logoutPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={t("settings.logout")}
        >
          <Feather name="log-out" size={18} color={theme.colors.error.main} />
          <Text style={styles.logoutText}>{t("settings.logout")}</Text>
        </Pressable>

        {/*
          Last on the screen and visually quietest: required to exist, never
          something to reach for by accident.
        */}
        <Pressable
          onPress={confirmDeleteAccount}
          disabled={isDeletingAccount}
          style={({ pressed }) => [
            styles.deleteAccount,
            pressed && styles.deleteAccountPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={t("settings.deleteAccount")}
          accessibilityState={{ disabled: isDeletingAccount }}
        >
          <Text style={styles.deleteAccountText}>
            {isDeletingAccount ? "Suppression…" : t("settings.deleteAccount")}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
