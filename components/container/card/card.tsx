import React, { ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../../providers/ThemeProvider";
import { createStyles } from "./card.style";
import { getStyle } from "./utils";

interface CardProps {
  borderColor: string;
  iconSymbol: ReactElement<any, any>;
  title: string;
  description: string;
  helpText?: string;
  handlePress: () => void;
}

export const Card: React.FC<CardProps> = ({
  borderColor,
  iconSymbol,
  title,
  description,
  helpText,
  handlePress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, borderColor);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => getStyle({ pressed })}
    >
      <View style={[styles.card]}>
        <View style={[styles.iconContainer]}>{iconSymbol}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {helpText && <Text style={styles.helpText}>{helpText}</Text>}
      </View>
    </Pressable>
  );
};
