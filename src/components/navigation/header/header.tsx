import React from "react";
import { View, Text, Pressable, Clipboard, Share } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { TeamCrest } from "./TeamCrest";
import { createStyles } from "./header.style";

interface HeaderProps {
  handlerBack?: () => void;
  title?: string | null;
  /** Hide when a tab bar continues the chrome and carries the gold itself. */
  showClubStripe?: boolean;
  /** The club identity and its actions only belong inside the team area. */
  showTeamActions?: boolean;
}

const Header = ({
  handlerBack,
  title,
  showClubStripe = true,
  showTeamActions = false,
}: HeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const { userData } = useAuth();

  const team = userData?.team ?? null;
  const teamName = team?.name ?? title ?? "Buvio";

  const copyCode = () => {
    if (!team?.code) {
      return;
    }

    Clipboard.setString(team.code);

    Toast.show({
      type: "success",
      text1: `Code ${team.code} copié`,
      position: "bottom",
      visibilityTime: 1800,
    });
  };

  const shareCode = () => {
    if (!team?.code) {
      return;
    }

    Share.share({
      message: `Rejoins ${team.name} sur Buvio avec le code ${team.code}`,
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {handlerBack ? (
          <Pressable
            onPress={handlerBack}
            style={styles.iconButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Retour"
          >
            <Feather
              name="arrow-left"
              size={22}
              color={theme.colors.primary.contrastText}
            />
          </Pressable>
        ) : (
          <TeamCrest name={teamName} url={team?.crestUrl} />
        )}

        <View style={styles.identity}>
          <Text style={styles.title} numberOfLines={1}>
            {teamName}
          </Text>
          {showTeamActions && team?.code ? (
            <Pressable
              onPress={copyCode}
              onLongPress={shareCode}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel={`Copier le code d’équipe ${team.code}`}
              accessibilityHint="Appui long pour partager"
              style={({ pressed }) => [
                styles.codePill,
                pressed && styles.codePillPressed,
              ]}
            >
              <Text style={styles.codeText}>{team.code}</Text>
              <Feather
                name="copy"
                size={12}
                color={theme.colors.primary.contrastText}
              />
            </Pressable>
          ) : null}
        </View>

        {showTeamActions ? (
          <Pressable
            onPress={() => router.push("/settings")}
            style={styles.iconButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Réglages"
          >
            <Feather
              name="settings"
              size={22}
              color={theme.colors.primary.contrastText}
            />
          </Pressable>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
      {/* The gold club stripe closing the chrome (see DESIGN.md). */}
      {showClubStripe ? <View style={styles.clubStripe} /> : null}
    </View>
  );
};

export default Header;
