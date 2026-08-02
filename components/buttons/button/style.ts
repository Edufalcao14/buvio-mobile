// app/components/CustomHeader.tsx
import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

export const createStyles = (theme: Theme , backgroundColor : string) =>
  StyleSheet.create({
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor ,
      gap: theme.spacing.sm,
      padding: theme.spacing.sm,
      borderRadius:theme.borderRadius.md
    },
    disabled: {
      backgroundColor: theme.colors.grey.disable, 
      opacity: 0.5, 
    },
    buttonText: {
      color: theme.colors.text.lightText, 
      fontSize: theme.typography.fontSize.md, 
      fontWeight: "bold", 
    },
  });
