import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { createStyles } from "./header.style";
import { useTheme } from "../../../providers/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";

interface HeaderProps {
  handlerBack?: () => void;
  title?: string | null;
  backgroundColor?: string;
}

const Header = ({ handlerBack, title, backgroundColor }: HeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(
    theme,
    insets,
    backgroundColor ? backgroundColor : theme.colors.primary.main
  );

  return (
    <View style={[styles.container, { elevation: 5 }]}>
      {handlerBack && (
        <Pressable onPress={handlerBack} style={styles.arrowBackButton}>
          <Fontisto name="arrow-left-l" size={24} color="white" />
        </Pressable>
      )}
      <View style={styles.containerLogo}>
        <Image
          style={styles.tinyLogo}
          source={require("../../../assets/images/logo_buvio.png")}
        />
      </View>

      {title ? (
        <Text style={[styles.title]}>{title}</Text>
      ) : (
        <Text style={[styles.title]}>Buvio</Text>
      )}
    </View>
  );
};
export default Header;
