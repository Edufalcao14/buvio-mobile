import React, { useState } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles, type AvatarTone } from "./PlayerAvatar.styles";

interface PlayerAvatarProps {
  /** The name the squad reads — the source of the monogram. */
  name: string;
  /** The player's uploaded avatar. Null until they have one. */
  url?: string | null;
  size?: number;
  tone?: AvatarTone;
}

/**
 * The monogram is the avatar until a player uploads a picture, and it stays
 * the avatar whenever that picture fails to load: a dead URL degrades to
 * initials instead of leaving a hole (see docs/PLAN-realtime-voting.md).
 *
 * Shared by the vote screens, the live tally and the standings podiums, so it
 * lives outside any single feature.
 */
export const initialsOf = (name: string): string => {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return "?";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  name,
  url,
  size = 52,
  tone = "neutral",
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, size, tone);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  // The failure is remembered against the URL that produced it: changing an
  // avatar must give the new picture its own chance, not inherit the old
  // one's fall back to initials.
  const showPhoto = Boolean(url) && failedUrl !== url;

  return (
    <View
      style={styles.avatar}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {showPhoto ? (
        <Image
          style={styles.photo}
          source={{ uri: url as string }}
          contentFit="cover"
          onError={() => setFailedUrl(url ?? null)}
        />
      ) : (
        <Text style={styles.initials}>{initialsOf(name)}</Text>
      )}
    </View>
  );
};

export default PlayerAvatar;
