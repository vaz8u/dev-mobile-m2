import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
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
