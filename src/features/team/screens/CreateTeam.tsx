// app/(team)/index.tsx
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { createStyles } from "./CreateTeam.styles";
import { useTheme } from "@/providers/ThemeProvider";
import { useMemo } from "react";
import { FormTextInput } from "@/components/inputs/formTextInput";
import { PicturePicker } from "@/components/avatars/PicturePicker";
import { TeamCrest } from "@/components/navigation/header/TeamCrest";
import { useWatch } from "react-hook-form";
import { Button } from "@/components/buttons/button";
import { useCreateTeamViewModel } from "../hooks/useCreateTeamViewModel";

export default function CreateTeamScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {
    control,
    errors,
    error,
    isLoading,
    crestUri,
    crestError,
    chooseCrest,
    handleSubmit,
  } = useCreateTeamViewModel();

  // The preview builds its monogram from whatever has been typed so far, so the
  // badge is already the team's own before a picture is chosen.
  const typedName = useWatch({ control, name: "name" });

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
            <Text style={styles.subtitle}>
              Donnez un nom à votre équipe pour obtenir un code d’invitation
              unique.
            </Text>
          </View>
          <View style={styles.containerInputs}>
            <PicturePicker
              label="Blason (optionnel)"
              accessibilityLabel="Choisir le blason de l’équipe"
              actionLabel={crestUri ? "Changer le blason" : "Ajouter un blason"}
              hint="Sans blason, l’équipe porte ses initiales."
              isBusy={isLoading}
              onPress={chooseCrest}
              errorText={crestError}
              preview={
                <TeamCrest
                  name={typedName || "Buvio"}
                  url={crestUri}
                  size={52}
                />
              }
            />

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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
