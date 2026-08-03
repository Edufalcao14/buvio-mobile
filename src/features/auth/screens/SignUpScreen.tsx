import {
  Text,
  ScrollView,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { createStyles } from "./SignUp.styles";
import { Link } from "expo-router";
import { useSignUpForm } from "../hooks/useSignUpViewModel";
import { useTheme } from "@/providers/ThemeProvider";
import React, { useMemo } from "react";
import { FormTextInput } from "@/components/inputs/formTextInput";
import { Button } from "@/components/buttons/button";
import { FormPasswordInput } from "@/components/inputs/formPasswordInput";
import { AuthHero } from "../components/AuthHero";
import { PicturePicker } from "@/components/avatars/PicturePicker";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";

export default function SignUp() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    control,
    errors,
    loading,
    error,
    avatarUri,
    avatarError,
    chooseAvatar,
    removeAvatar,
    handleSubmit,
  } = useSignUpForm();

  return (
    <View style={styles.screen}>
      <AuthHero title="Alors, on signe où ?" accent="où ?" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboard}
      >
        <View style={styles.sheet}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sheetTitle}>Inscription</Text>
            <Text style={styles.subtitle}>
              Créez votre compte pour commencer l’aventure Top/Flop avec
              votre equipe
            </Text>

            <View style={styles.formContainer}>
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
                placeHolder="Optionnel — le nom que l’équipe utilise"
                name="nickname"
              />

              <PicturePicker
                label="Photo de profil"
                accessibilityLabel="Choisir une photo de profil"
                actionLabel={
                  avatarUri ? "Changer la photo" : "Choisir une photo"
                }
                hint="Optionnel — tu peux l’ajouter plus tard."
                onPress={chooseAvatar}
                onRemove={avatarUri ? removeAvatar : undefined}
                removeLabel="Retirer la photo"
                errorText={avatarError}
                preview={<PlayerAvatar name="" url={avatarUri} size={44} />}
              />

              <FormTextInput
                control={control}
                errors={errors}
                label="Email"
                placeHolder="votre@email.com"
                name="email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <FormPasswordInput
                control={control}
                errors={errors}
                label="Mot de passe"
                placeHolder="6 caractères minimum"
                name="password"
              />

              <FormPasswordInput
                control={control}
                errors={errors}
                label="Confirmer Mot de passe"
                placeHolder="6 caractères minimum"
                name="confirmPassword"
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.inputContainer}>
                <Button
                  text="S'inscrire"
                  isLoading={loading}
                  onPress={handleSubmit}
                />
              </View>

              <Text style={styles.textLink}>
                Déjà un compte ?{" "}
                <Link style={styles.link} href={"/auth/signIn"}>
                  Se Connecter
                </Link>
              </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
