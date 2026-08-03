import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";
import { Card } from "@/components/container/card/card";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./Style";
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MascotBubble } from "@/components/mascot/MascotBubble";

export default function Welcome() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  
  const handleCreateTeamPress = () => {
    // Action à effectuer quand l'utilisateur crée une équipe
    
    router.push("/welcome/createTeam")
  };

  const handleJoinTeamPress = () => {
    // Action à effectuer quand l'utilisateur rejoint une équipe
    router.push("/welcome/joinTeam")
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.textContainer}>
          <MascotBubble line="La troisième mi-temps commence ici !" />
          <Text style={styles.title}>Bienvenue sur Buvio !</Text>
          <Text style={styles.descriptionHeader}>
            Pour commencer, rejoignez une équipe existante ou créez la vôtre.
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <Card
            accentColor={theme.colors.primary.main}
            iconSymbol={<Entypo name="plus" size={24} color={theme.colors.primary.contrastText} />}
            title={"Créer une équipe"}
            description={
              "Créez votre propre équipe et invitez vos amis à rejoindre avec un code unique."
            }
            handlePress={handleCreateTeamPress}
          />
                
          <Card
            accentColor={theme.colors.primary.light}
            iconSymbol={<Fontisto name="arrow-right-l" size={24} color={theme.colors.primary.contrastText} />}
            title={"Rejoindre une équipe"}
            description={
              "Rejoignez une équipe existante en utilisant un code d'invitation."
            }
            helpText="Besoin d'aide ?"
            handlePress={handleJoinTeamPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}