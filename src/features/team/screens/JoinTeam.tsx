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
import { createStyles } from "./JoinTeam.style";
import CodeInput from "@/components/inputs/codeInput";
import { useJoinTeamForm } from "../hooks/useJoinTeamViewModel";

export default function JoinTeamScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { control, handleSubmit, code, errors, error, loading } =
    useJoinTeamForm();

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
            <Text style={styles.title}>Rejoindre une équipe</Text>
            <Text style={styles.description}>
              Entrez le code à 5 caractères fourni par le créateur de l’équipe.
            </Text>
          </View>
          <View style={styles.containerMain}>
            <View style={styles.inputContainers}>
              <View style={styles.displayCodeInfoContainer}>
                <Text style={styles.inputLabel}>Code d’équipe</Text>
                <Text
                  style={[
                    styles.displayCode,
                    code?.length ? styles.displayCodeActive : null,
                  ]}
                >
                  {code}
                </Text>
              </View>
              <Text style={styles.codeHint}>
                Le code est composé de 5 caractères alphanumériques
              </Text>
              <CodeInput
                code={code}
                control={control}
                name="code"
                errors={errors}
              />
            </View>
            <Button
              text={"Rejoindre l’équipe"}
              onPress={handleSubmit}
              disabled={code?.length !== 5}
              isLoading={loading}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Vous ne connaissez pas le code ?
            </Text>
            <Pressable accessibilityRole="button">
              <Text style={styles.helpLink}>
                Demandez-le au créateur de l’équipe
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
