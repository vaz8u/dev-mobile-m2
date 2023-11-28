import { Pressable, StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
export default function TabOneScreen() {
  const navigation = useRouter();
  return (
    <View style={styles.container}>
      <Button icon="plus" mode="elevated" onPress={() => navigation.push('/(tabs)/createAlarms')}>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
