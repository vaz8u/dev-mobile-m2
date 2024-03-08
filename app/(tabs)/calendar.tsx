import { StyleSheet } from 'react-native';
import InteractiveCalendar from '../../components/InteractiveCalendar';
import { View } from '../../components/Themed';

export default function CalendarScreen() {
  return (
    <View>
    <InteractiveCalendar></InteractiveCalendar>
    </View>
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
