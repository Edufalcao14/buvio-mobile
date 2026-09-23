import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { useMemo } from "react";
import { Button } from "@/components/buttons/button";
import { createStyles } from "./JoinTeam.styles";
import CodeInput from "@/components/inputs/codeInput";
import { useJoinTeamViewModel } from "../hooks/useJoinTeamViewModel";
import { t } from "@/i18n";

export default function JoinTeamScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { control, handleSubmit, code, errors, error, loading } =
    useJoinTeamViewModel();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboard}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{t("team.join.title")}</Text>
            <Text style={styles.description}>{t("team.join.subtitle")}</Text>
          </View>
          <View style={styles.containerMain}>
            <View style={styles.inputContainers}>
              <View style={styles.displayCodeInfoContainer}>
                <Text style={styles.inputLabel}>
                  {t("team.join.codeLabel")}
                </Text>
                {/* Five blanks until the first character lands, so the
                    readout never sits as an empty box. */}
                <Text
                  style={[
                    styles.displayCode,
                    code?.length
                      ? styles.displayCodeActive
                      : styles.displayCodeEmpty,
                  ]}
                >
                  {code?.length ? code : "_____"}
                </Text>
              </View>
              <Text style={styles.codeHint}>{t("team.join.codeHint")}</Text>
              <CodeInput
                code={code}
                control={control}
                name="code"
                errors={errors}
              />
            </View>
            <Button
              text={t("team.join.submit")}
              onPress={handleSubmit}
              disabled={code?.length !== 5}
              isLoading={loading}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>{t("team.join.noCode")}</Text>
            <Pressable accessibilityRole="button">
              <Text style={styles.helpLink}>{t("team.join.askCreator")}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
