import React, { useState } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/providers/ThemeProvider";
import { createCrestStyles } from "./header.styles";

interface TeamCrestProps {
  name: string;
  /** The team's uploaded crest. Null while the club still shows a monogram. */
  url?: string | null;
  size?: number;
}

/**
 * The club badge. A team that uploaded a crest wears it; every other team
 * wears a monogram built from its own name — a real badge beats a stock
 * placeholder every club would share. The monogram is also the fallback when
 * an uploaded crest fails to load, so the header never shows a hole.
 */
const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .filter((word) => !["de", "des", "du", "la", "le", "les"].includes(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "B";

export const TeamCrest: React.FC<TeamCrestProps> = ({
  name,
  url,
  size = 44,
}) => {
  const theme = useTheme();
  const styles = createCrestStyles(theme, size);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  // Remembered against the URL that failed, so a newly uploaded crest gets its
  // own chance instead of inheriting the previous one's failure.
  const showBadge = Boolean(url) && failedUrl !== url;

  return (
    <View
      style={styles.crest}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {showBadge ? (
        <Image
          style={styles.badge}
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

export default TeamCrest;
