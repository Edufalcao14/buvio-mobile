// app/(team)/index.tsx
import { Text, View } from "react-native";
import { styles } from "./History.styles";
import React from "react";
import { useAuth } from "../../providers/AuthProvider";
export default function History() {
  const {userData } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userData?.displayName}</Text>
      <Text style={styles.title}>Nom équipe : {userData?.team?.name}</Text>
      <Text style={styles.title}>Code équipe : {userData?.team?.code}</Text>
      <Text style={styles.title}>Sport équipe : {userData?.team?.sport}</Text>
    </View>
  );
}
