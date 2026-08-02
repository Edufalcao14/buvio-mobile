// app/(team)/index.tsx
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { createStyles } from "./CreateTeam.style";
import { useTheme } from "../../providers/ThemeProvider";
import { useMemo } from "react";
import { FormTextInput } from "../../components/inputs/formTextInput";
import { Button } from "../../components/buttons/button";
import { useCreateTeamFormLogic } from "./useCreateTeamFormLogic";

export default function CreateTeamScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { control, errors, error, isLoading, handleSubmit } = useCreateTeamFormLogic();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboard}
      keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 0}
    >
      <ScrollView
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Créer une équipe</Text>
            <Text>
              Donnez un nom à votre équipe pour obtenir un code d'invitation
              unique.
            </Text>
          </View>
          <View style={styles.containerInputs}>
            <FormTextInput
              control={control}
              errors={errors}
              label="Nom de l'équipe"
              placeHolder="Ex: Les Invincibles"
              name="name"
            />
            <FormTextInput
              control={control}
              errors={errors}
              label="Sport (optionnel)"
              placeHolder="Ex: Football,Basketball..."
              name="sport"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <Button
            text={"Créer l'équipe"}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
