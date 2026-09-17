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
      <Header title="Réglages" handlerBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Joueur</Text>

          <View style={styles.form}>
            <PicturePicker
              label="Photo de profil"
              accessibilityLabel="Changer la photo de profil"
              actionLabel={avatarUrl ? "Changer la photo" : "Ajouter une photo"}
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
              label="Nom Complet"
              placeHolder="Prénom et Nom"
              name="displayName"
            />

            <FormTextInput
              control={control}
              errors={errors}
              label="Surnom"
              placeHolder="Le nom que l’équipe utilise"
              name="nickname"
            />
            <Text style={styles.fieldHint}>
              Laisse le surnom vide pour revenir au prénom de ton nom complet.
            </Text>

            <View style={styles.emailRow}>
              <Text style={styles.emailLabel}>Email</Text>
              <Text style={styles.secondaryValue}>{email ?? "—"}</Text>
            </View>

            {profileError ? (
              <Text style={styles.errorText}>{profileError}</Text>
            ) : null}

            {/* The only gold action on this screen (see DESIGN.md). */}
            <View style={styles.saveAction}>
              <Button
                text="Enregistrer"
                isLoading={isSavingProfile}
                disabled={!isDirty}
                onPress={saveProfile}
              />
            </View>
          </View>
        </View>

        {team ? (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Équipe</Text>
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
                  label="Blason de l’équipe"
                  accessibilityLabel="Changer le blason de l’équipe"
                  actionLabel={
                    team.crestUrl ? "Changer le blason" : "Ajouter un blason"
                  }
                  hint="Visible par toute l’équipe."
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
              <Text style={styles.codeLabel}>Code d’invitation</Text>
              <Text style={styles.codeValue}>{team.code}</Text>
              <Text style={styles.codeHint}>
                Partage-le pour que tes coéquipiers rejoignent l’équipe.
              </Text>

              <View style={styles.codeActions}>
                <Pressable
                  onPress={copyCode}
                  style={({ pressed }) => [
                    styles.codeAction,
                    pressed && styles.codeActionPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Copier le code d’invitation"
                >
                  <Feather
                    name="copy"
                    size={16}
                    color={theme.colors.primary.light}
                  />
                  <Text style={styles.codeActionText}>Copier</Text>
                </Pressable>

                <Pressable
                  onPress={shareCode}
                  style={({ pressed }) => [
                    styles.codeAction,
                    pressed && styles.codeActionPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Partager le code d’invitation"
                >
                  <Feather
                    name="share-2"
                    size={16}
                    color={theme.colors.primary.light}
                  />
                  <Text style={styles.codeActionText}>Partager</Text>
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
          accessibilityLabel="Se déconnecter"
        >
          <Feather name="log-out" size={18} color={theme.colors.error.main} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
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
          accessibilityLabel="Supprimer mon compte"
          accessibilityState={{ disabled: isDeletingAccount }}
        >
          <Text style={styles.deleteAccountText}>
            {isDeletingAccount ? "Suppression…" : "Supprimer mon compte"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
