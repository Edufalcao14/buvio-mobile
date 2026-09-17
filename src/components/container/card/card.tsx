import React, { ReactElement } from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { createStyles } from "./card.styles";
import { getStyle } from "./utils";

interface CardProps {
  /** Accent of the icon chip — never a colored border (see DESIGN.md). */
  accentColor: string;
  iconSymbol: ReactElement;
  title: string;
  description: string;
  helpText?: string;
  handlePress: () => void;
}

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
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={({ pressed }) => getStyle({ pressed })}
    >
      <View style={[styles.card]}>
        <View style={[styles.iconContainer]}>{iconSymbol}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {helpText ? <Text style={styles.helpText}>{helpText}</Text> : null}
      </View>
    </Pressable>
  );
};
