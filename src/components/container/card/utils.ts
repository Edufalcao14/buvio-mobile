// components/container/card/utils.ts
import { ViewStyle } from "react-native";

export const getStyle = ({ pressed }: { pressed: boolean }): ViewStyle => ({
  opacity: pressed ? 0.8 : 1,
  transform: [{ scale: pressed ? 0.98 : 1 }],
});