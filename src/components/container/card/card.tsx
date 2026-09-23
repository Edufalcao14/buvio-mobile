import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { PressableScale } from "@/components/motion/PressableScale";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./card.styles";

interface CardProps {
  /** Tint of the icon disc only. */
  accentColor: string;
  iconSymbol: ReactElement;
  title: string;
  description: string;
  helpText?: string;
  handlePress: () => void;
}

/** A tappable row: icon disc, title + description, chevron. */
export const Card: React.FC<CardProps> = ({
  accentColor,
  iconSymbol,
  title,
  description,
  helpText,
  handlePress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, accentColor);

  return (
    <PressableScale accessibilityRole="button" onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>{iconSymbol}</View>
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {helpText ? <Text style={styles.helpText}>{helpText}</Text> : null}
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={theme.colors.text.hint}
        />
      </View>
    </PressableScale>
  );
};
