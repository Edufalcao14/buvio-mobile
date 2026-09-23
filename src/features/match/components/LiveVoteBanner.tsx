import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { PressableScale } from "@/components/motion/PressableScale";
import { LiveDot } from "@/components/motion/LiveDot";
import { t } from "@/i18n";
import type { Theme } from "@/theme";

interface LiveVoteBannerProps {
  matchName: string;
  onPress: () => void;
}

/**
 * The "live match" card sports apps pin to the top while something is
 * happening: a breathing dot, the fixture, one verb. It is the one place on
 * the team screens that uses Verde Vif as a surface, because it *is* the
 * live state.
 */
export const LiveVoteBanner: React.FC<LiveVoteBannerProps> = ({
  matchName,
  onPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <PressableScale
      onPress={onPress}
      haptic
      accessibilityRole="button"
      accessibilityLabel={t("match.voteA11y", { name: matchName })}
      style={styles.card}
    >
      <View style={styles.left}>
        <View style={styles.liveRow}>
          <LiveDot color={theme.colors.primary.light} />
          <Text style={styles.live}>{t("match.liveBanner.title")}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {matchName}
        </Text>
      </View>
      <View style={styles.cta}>
        <Text style={styles.ctaText}>{t("match.liveBanner.cta")}</Text>
        <Feather
          name="arrow-right"
          size={16}
          color={theme.colors.secondary.contrastText}
        />
      </View>
    </PressableScale>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.success.light,
      borderWidth: 1,
      borderColor: theme.colors.primary.dark,
    },
    left: { flex: 1, gap: 4 },
    liveRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    live: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: theme.typography.letterSpacing.caps,
      textTransform: "uppercase",
      color: theme.colors.primary.light,
    },
    name: {
      fontFamily: theme.typography.fontFamily.display,
      fontSize: theme.typography.fontSize.xl,
      letterSpacing: theme.typography.letterSpacing.tight,
      color: theme.colors.text.primary,
    },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: theme.spacing.md,
      height: 40,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.secondary.main,
    },
    ctaText: {
      fontFamily: theme.typography.fontFamily.displayBold,
      fontSize: theme.typography.fontSize.sm,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.secondary.contrastText,
    },
  });

export default LiveVoteBanner;
