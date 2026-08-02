import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { useMemo } from "react";
import { Button } from "../../components/buttons/button";
import { createStyles } from "./JoinTeam.style";
import CodeInput from "../../components/inputs/codeInput";
import { useJoinTeamForm } from "./useJoinTeamComponentLogic";

export default function JoinTeamScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { control, handleSubmit, watch, errors, error, loading } =
    useJoinTeamForm();

  const code = watch("code");

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
              Entrez le code à 5 caractères fourni par le créateur de l'équipe.
            </Text>
          </View>
          <View style={styles.containerMain}>
            <View style={styles.inputContainers}>
              <View style={styles.displayCodeInfoContainer}>
                <Text style={styles.inputLabel}>Code d'équipe</Text>
                <Text style={styles.displayCode}>{code}</Text>
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
              text={"Rejoindre l'équipe"}
              onPress={handleSubmit}
              disabled={code?.length !== 5}
              onLoading={loading}
              backgroundColor={theme.colors.secondary.main}
            />
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Vous ne connaissez pas le code ?
            </Text>
            <TouchableOpacity>
              <Text style={styles.helpLink}>
                Demandez-le au créateur de l'équipe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
