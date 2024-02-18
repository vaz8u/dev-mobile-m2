import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import AlarmListScreen from '../../views/alarmList';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import LogRocket from '@logrocket/react-native';

LogRocket.init('af6cqg/wakeup');
LogRocket.identify("1", {
  name: 'James Morrison',
  email: 'jamesmorrison@example.com',
});

export default function TabOneScreen() {
  const navigation = useRouter();
  return (
    <View style={styles.container}>
      <AlarmListScreen></AlarmListScreen>
        <Button onPress={() => navigation.push('/pages/connexion')}><Text>connexion</Text>
        </Button>
        <Button icon="plus" mode="elevated" onPress={() => navigation.push('/(tabs)/createAlarms')} children={undefined}>
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
