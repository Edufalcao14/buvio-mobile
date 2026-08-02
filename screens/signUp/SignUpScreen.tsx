// app/(team)/index.tsx
import React from "react";
import {
  Text,
  ScrollView,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { createStyles } from "./SignUp.styles";
import { Link } from "expo-router";
import { useSignUpForm } from "./useSignUpComponentLogic";
import { useTheme } from "../../providers/ThemeProvider";
import { useMemo } from "react";
import { FormTextInput } from "../../components/inputs/formTextInput";
import { Button } from "../../components/buttons/button";
import { FormPasswordInput } from "../../components/inputs/formPasswordInput";

export default function SignUp() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { control, errors, loading, error, handleSubmit } = useSignUpForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboard}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.containerText}>
          <Text style={styles.title}>Inscription</Text>
          <Text>
            Créez votre compte pour commencer l'aventure Top/Flop avec votre
            equipe
          </Text>
        </View>

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
            label="Email"
            placeHolder="votre@email.com"
            name="email"
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
          {error && <Text style={styles.errorText}>{error}</Text>}
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
    </KeyboardAvoidingView>
  );
}
