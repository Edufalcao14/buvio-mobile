import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./PicturePicker.styles";

interface PicturePickerProps {
  /** What the picture is: "Photo de profil", "Blason de l'équipe". */
  label: string;
  /** The thing itself — a `PlayerAvatar` or a `TeamCrest`. */
  preview: ReactNode;
  /** What tapping does, in plain words. */
  actionLabel: string;
  onPress: () => void;
  hint?: string | null;
  isBusy?: boolean;
  /** Offered only once there is something to take back. */
  onRemove?: () => void;
  removeLabel?: string;
  errorText?: string | null;
  accessibilityLabel: string;
}

/**
 * The one control for choosing a picture, shared by sign-up and settings.
 *
 * It never wears gold: a screen has a single gold action and it is the one
 * that commits (DESIGN.md). The preview is passed in rather than built here so
 * a player keeps their round avatar and a club keeps its crest.
 */
export const PicturePicker: React.FC<PicturePickerProps> = ({
  label,
  preview,
  actionLabel,
  onPress,
  hint,
  isBusy = false,
  onRemove,
  removeLabel = "Retirer",
  errorText,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.field}>
      <Pressable
        onPress={onPress}
        disabled={isBusy}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ busy: isBusy, disabled: isBusy }}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      >
        <View style={styles.preview}>{preview}</View>

        <View style={styles.text}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.action}>{actionLabel}</Text>
          {hint ? <Text style={styles.hint}>{hint}</Text> : null}
        </View>

        {isBusy ? (
          <ActivityIndicator color={theme.colors.primary.light} />
        ) : (
          <Feather
            name="image"
            size={18}
            color={theme.colors.text.secondary}
          />
        )}
      </Pressable>

      {onRemove && !isBusy ? (
        <Pressable
          onPress={onRemove}
          style={styles.remove}
          accessibilityRole="button"
          accessibilityLabel={removeLabel}
        >
          <Text style={styles.removeText}>{removeLabel}</Text>
        </Pressable>
      ) : null}

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

export default PicturePicker;
