import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import AlarmListScreen from '../../views/alarmList';
import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const navigation = useRouter();
  return (
    <View style={styles.container}>
      <AlarmListScreen></AlarmListScreen>
        {/* <Button mode="elevated" onPress={() => navigation.push('/pages/connexion')}>
          <Text>connexion</Text>
        </Button>
        <Button icon="plus" mode="elevated" onPress={() => navigation.push('/(tabs)/createAlarms')} children={undefined}></Button> */}
        <View style={styles.buttonContainer}>
          <Button
              style={styles.button}
              mode="elevated"
              icon="plus"
              onPress={() => navigation.push('/(tabs)/createAlarms') } children={undefined} >
          </Button>
        </View>
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
  buttonContainer:{
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: "100%"
  },
  button:{
    margin: 20,
  },
});
