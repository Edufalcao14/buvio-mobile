import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/ThemeProvider";
import { useMemo } from "react";
import { createStyles } from "./SignIn.styles";
import { FormTextInput } from "@/components/inputs/formTextInput";
import { Button } from "@/components/buttons/button";
import { useSignInViewModel } from "../hooks/useSignInViewModel";
import { FormPasswordInput } from "@/components/inputs/formPasswordInput";
import { t } from "@/i18n";

export default function SignInScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);
  const { control, handleSubmit, errors, error, loading } =
    useSignInViewModel();

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboard}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.wordmark}>{t("auth.wordmark")}</Text>
          <Text style={styles.sheetTitle} accessibilityRole="header">
            {t("auth.signIn.title")}
          </Text>
          <Text style={styles.subtitle}>{t("auth.signIn.subtitle")}</Text>

          <View style={styles.formContainer}>
            <FormTextInput
              control={control}
              label={t("common.email")}
              placeHolder={t("auth.emailPlaceholder")}
              name="email"
              errors={errors}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <FormPasswordInput
              control={control}
              errors={errors}
              label={t("common.password")}
              placeHolder={t("auth.passwordPlaceholder")}
              name="password"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.textLink}>
              <Link style={styles.link} href={"/signIn"}>
                {t("auth.signIn.forgot")}
              </Link>
            </Text>
            <View style={styles.inputContainer}>
              <Button
                text={t("auth.signIn.submit")}
                onPress={handleSubmit}
                isLoading={loading}
              />
            </View>
            <Text style={styles.textLink}>
              {t("auth.signIn.noAccount")}{" "}
              <Link style={styles.link} href={"/auth"}>
                {t("auth.signIn.link")}
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
