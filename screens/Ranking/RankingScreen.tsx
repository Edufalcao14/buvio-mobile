// app/(team)/index.tsx
import { Text, View } from "react-native";
import { styles } from "./Ranking.styles";

export default function Ranking() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
    </View>
  );
}

