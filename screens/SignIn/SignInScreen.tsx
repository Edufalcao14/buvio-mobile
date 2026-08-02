// app/(team)/index.tsx
import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, router } from "expo-router";
import { useTheme } from "../../providers/ThemeProvider";
import { useMemo } from "react";
import { createStyles } from "./SignIn.styles";
import { FormTextInput } from "../../components/inputs/formTextInput";
import { Button } from "../../components/buttons/button";
import { useSignInForm } from "./useSignInComponentLogic";
import { FormPasswordInput } from "../../components/inputs/formPasswordInput";
import { UserInputForms } from "./SignInValidation";

export default function SignInScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { control, handleSubmit, errors, error, loading } = useSignInForm();


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboard}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.containerText}>
          <Text style={styles.title}>Connexion</Text>

          <Text>Connectez-vous pour retrouver votre équipe</Text>
          <FormTextInput
            control={control}
            label="Email"
            placeHolder="votre@email.com"
            name="email"
            errors={errors}
          />
          <FormPasswordInput
            control={control}
            errors={errors}
            label="Mot de passe"
            placeHolder="6 caractères minimum"
            name="password"
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
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
              S'inscrire
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
