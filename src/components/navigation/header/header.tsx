import React from "react";
import { View, Text, Pressable, Clipboard, Share } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { tapImpact } from "@/components/motion/haptics";
import { t } from "@/i18n";
import { TeamCrest } from "./TeamCrest";
import { createStyles } from "./header.styles";

interface HeaderProps {
  handlerBack?: () => void;
  title?: string | null;
  /** Legacy flag, kept for call sites; the stripe no longer exists. */
  showClubStripe?: boolean;
  /** The club identity and its actions only belong inside the team area. */
  showTeamActions?: boolean;
}

/**
 * Two faces. A plain bar (back arrow + screen title) everywhere, and the
 * club hero on the team tabs: crest large, name in display type, the sport
 * and the invite code as a quiet second line — the way a team page opens in
 * any sports app.
 */
const Header = ({
  handlerBack,
  title,
  showTeamActions = false,
}: HeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const { userData } = useAuth();

  const team = userData?.team ?? null;
  // An explicit `title` names the screen; only a bar with no title of its
  // own is the club's bar.
  const teamName = title ?? team?.name ?? "Buvio";

  const copyCode = () => {
    if (!team?.code) return;
    Clipboard.setString(team.code);
    tapImpact();
    Toast.show({
      type: "success",
      text1: t("team.header.copied", { code: team.code }),
      position: "bottom",
      visibilityTime: 1800,
    });
  };

  const shareCode = () => {
    if (!team?.code) return;
    Share.share({
      message: t("team.header.share", { name: team.name, code: team.code }),
    });
  };

  if (showTeamActions) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.hero}>
          <TeamCrest name={teamName} url={team?.crestUrl} size={56} />
          <View style={styles.identity}>
            <Text
              style={styles.heroTitle}
              numberOfLines={1}
              // A long club name shrinks rather than truncates: "Les Aigles
              // de Lisbo…" is not a team.
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              {teamName}
            </Text>
            <View style={styles.heroMeta}>
              {team?.sport ? (
                <Text style={styles.heroSport} numberOfLines={1}>
                  {team.sport}
                </Text>
              ) : null}
              {team?.code ? (
                <Pressable
                  onPress={copyCode}
                  onLongPress={shareCode}
                  hitSlop={6}
                  accessibilityRole="button"
                  accessibilityLabel={t("team.header.copyA11y", {
                    code: team.code,
                  })}
                  accessibilityHint={t("team.header.longPressHint")}
                  style={({ pressed }) => [
                    styles.codePill,
                    pressed && styles.codePillPressed,
                  ]}
                >
                  <Text style={styles.codeText}>{team.code}</Text>
                  <Feather
                    name="copy"
                    size={12}
                    color={theme.colors.text.secondary}
                  />
                </Pressable>
              ) : null}
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/settings")}
            style={styles.iconButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={t("team.header.settings")}
          >
            <Feather
              name="settings"
              size={22}
              color={theme.colors.text.primary}
            />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {handlerBack ? (
          <Pressable
            onPress={handlerBack}
            style={styles.iconButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={t("common.back")}
          >
            <Feather
              name="arrow-left"
              size={22}
              color={theme.colors.text.primary}
            />
          </Pressable>
        ) : (
          <TeamCrest name={teamName} url={team?.crestUrl} />
        )}
        <View style={styles.identity}>
          <Text style={styles.title} numberOfLines={1}>
            {teamName}
          </Text>
        </View>
        <View style={styles.iconButton} />
      </View>
    </View>
  );
};

export default Header;
