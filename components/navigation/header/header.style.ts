// app/components/CustomHeader.tsx
import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";
import { EdgeInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export const createStyles = (theme: Theme, insets: EdgeInsets , backgroundColor : string) => {
  const paddingValue = Platform.OS === "android" ? insets.top + 20 : insets.top;

  return StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: backgroundColor,
      gap: theme.spacing.sm,
      paddingTop: paddingValue,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      paddingBottom: 10,
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    containerLogo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      gap: theme.spacing.sm,
    },
    title: {
      color: theme.colors.text.lightText,
      fontSize: theme.typography.fontSize.xxxl,
      fontWeight: "bold",
    },
    tinyLogo: {
      width: 60,
      height: 60,
      borderRadius: 10,
      alignSelf: "center",
      shadowColor: theme.colors.background.default,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.35,
      shadowRadius: 6,
      elevation: 5,
    },
    arrowBackButton: {
      position: "absolute",
      top: 60,
      left: 20,
    },
  });
};
