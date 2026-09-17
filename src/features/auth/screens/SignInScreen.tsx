import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { useTheme } from "@/providers/ThemeProvider";
import { useMemo } from "react";
import { createStyles } from "./SignIn.styles";
import { FormTextInput } from "@/components/inputs/formTextInput";
import { Button } from "@/components/buttons/button";
import { useSignInViewModel } from "../hooks/useSignInViewModel";
import { FormPasswordInput } from "@/components/inputs/formPasswordInput";
import { AuthHero } from "../components/AuthHero";

export default function SignInScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { control, handleSubmit, errors, error, loading } =
    useSignInViewModel();

  return (
    <View style={styles.screen}>
      <AuthHero
        title="Re-bonjour, champion !"
        accent="champion !"
        mascot="whiteOutline"
      />
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
            <Text style={styles.sheetTitle}>Connexion</Text>
            <Text style={styles.subtitle}>
              Connectez-vous pour retrouver votre équipe
            </Text>

            <View style={styles.formContainer}>
              <FormTextInput
                control={control}
                label="Email"
                placeHolder="votre@email.com"
                name="email"
                errors={errors}
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
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.textLink}>
                <Text style={styles.link}>
                  <Link style={styles.link} href={"/signIn"}>
                    Mot de passe oublié ?
                  </Link>
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Button
                  text="Se Connecter"
                  onPress={handleSubmit}
                  isLoading={loading}
                />
              </View>
              <Text style={styles.textLink}>
                Pas encore de compte ?{" "}
                <Link style={styles.link} href={"/auth"}>
                  S’inscrire
                </Link>
              </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
