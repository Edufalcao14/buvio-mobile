import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { PlayerAvatar } from "./PlayerAvatar";

export type StackedPlayer = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  /** Draws a green ring — "this one is done". */
  done?: boolean;
};

interface AvatarStackProps {
  players: StackedPlayer[];
  max?: number;
  size?: number;
}

/**
 * Overlapping avatars with a "+N" tail: the roster at a glance instead of a
 * list the player has to scroll. Done players wear a Verde Vif ring so a live
 * vote reads who has spoken without a single word.
 */
export const AvatarStack: React.FC<AvatarStackProps> = ({
  players,
  max = 6,
  size = 36,
}) => {
  const theme = useTheme();
  const shown = players.slice(0, max);
  const rest = players.length - shown.length;
  const overlap = Math.round(size * 0.3);

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={players.map((p) => p.name).join(", ")}
    >
      {shown.map((player, index) => (
        <View
          key={player.id}
          style={{
            marginLeft: index === 0 ? 0 : -overlap,
            borderRadius: size,
            borderWidth: 2,
            borderColor: player.done
              ? theme.colors.primary.main
              : theme.colors.background.default,
            zIndex: shown.length - index,
          }}
        >
          <PlayerAvatar
            name={player.name}
            url={player.avatarUrl}
            size={size - 4}
          />
        </View>
      ))}
      {rest > 0 ? (
        <View
          style={{
            marginLeft: -overlap,
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: theme.colors.background.default,
            backgroundColor: theme.colors.grey[300],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.numeric,
              fontSize: Math.round(size * 0.36),
              color: theme.colors.text.primary,
            }}
          >
            +{rest}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
});

export default AvatarStack;
