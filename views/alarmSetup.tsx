import { StyleSheet } from 'react-native';
import AlarmForm from '../../components/AlarmForm';

export default function TabTwoScreen() {
  return (
    <AlarmForm></AlarmForm>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
