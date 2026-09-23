import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Card } from "@/components/container/card/card";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./Screens.styles";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "@/i18n";

export default function Welcome() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.textContainer}>
          <Text style={styles.eyebrow}>{t("welcome.eyebrow")}</Text>
          <Text style={styles.title}>{t("welcome.title")}</Text>
          <Text style={styles.descriptionHeader}>{t("welcome.subtitle")}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Card
            accentColor={theme.colors.secondary.main}
            iconSymbol={
              <Feather
                name="plus"
                size={22}
                color={theme.colors.secondary.contrastText}
              />
            }
            title={t("welcome.createTitle")}
            description={t("welcome.createDesc")}
            handlePress={() => router.push("/welcome/createTeam")}
          />

          <Card
            accentColor={theme.colors.grey[300]}
            iconSymbol={
              <Feather
                name="log-in"
                size={22}
                color={theme.colors.text.primary}
              />
            }
            title={t("welcome.joinTitle")}
            description={t("welcome.joinDesc")}
            handlePress={() => router.push("/welcome/joinTeam")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
