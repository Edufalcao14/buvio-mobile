import {
  Text,
  ScrollView,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { createStyles } from "./SignUp.styles";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSignUpViewModel } from "../hooks/useSignUpViewModel";
import { useTheme } from "@/providers/ThemeProvider";
import React, { useMemo } from "react";
import { FormTextInput } from "@/components/inputs/formTextInput";
import { Button } from "@/components/buttons/button";
import { FormPasswordInput } from "@/components/inputs/formPasswordInput";
import { PicturePicker } from "@/components/avatars/PicturePicker";
import { PlayerAvatar } from "@/components/avatars/PlayerAvatar";
import { t } from "@/i18n";

export default function SignUp() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);

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
  } = useSignUpViewModel();

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
            {t("auth.signUp.title")}
          </Text>
          <Text style={styles.subtitle}>{t("auth.signUp.subtitle")}</Text>

          <View style={styles.formContainer}>
            <FormTextInput
              control={control}
              errors={errors}
              label={t("auth.signUp.fullName")}
              placeHolder={t("auth.signUp.fullNamePlaceholder")}
              name="displayName"
            />

            <FormTextInput
              control={control}
              errors={errors}
              label={t("auth.signUp.nickname")}
              placeHolder={t("auth.signUp.nicknamePlaceholder")}
              name="nickname"
            />

            <PicturePicker
              label={t("auth.signUp.photo")}
              accessibilityLabel={t("auth.signUp.photoA11y")}
              actionLabel={
                avatarUri
                  ? t("auth.signUp.changePhoto")
                  : t("auth.signUp.choosePhoto")
              }
              hint={t("auth.signUp.photoHint")}
              onPress={chooseAvatar}
              onRemove={avatarUri ? removeAvatar : undefined}
              removeLabel={t("auth.signUp.removePhoto")}
              errorText={avatarError}
              preview={<PlayerAvatar name="" url={avatarUri} size={40} />}
            />

            <FormTextInput
              control={control}
              errors={errors}
              label={t("common.email")}
              placeHolder={t("auth.emailPlaceholder")}
              name="email"
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
              textContentType="newPassword"
              autoComplete="new-password"
            />

            <FormPasswordInput
              control={control}
              errors={errors}
              label={t("auth.signUp.confirmPassword")}
              placeHolder={t("auth.passwordPlaceholder")}
              name="confirmPassword"
              textContentType="newPassword"
              autoComplete="new-password"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.inputContainer}>
              <Button
                text={t("auth.signUp.submit")}
                isLoading={loading}
                onPress={handleSubmit}
              />
            </View>

            <Text style={styles.textLink}>
              {t("auth.signUp.hasAccount")}{" "}
              <Link style={styles.link} href={"/auth/signIn"}>
                {t("auth.signUp.link")}
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
