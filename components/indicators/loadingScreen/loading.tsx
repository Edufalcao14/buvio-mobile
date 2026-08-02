// app/loading.tsx
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '../../../theme';
import { styles } from './loading.style';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary.main} />
    </View>
  );
}

