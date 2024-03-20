import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import AdvancedAlarmForm from '../../components/CreateAlarmAdvancedForm';
import ClassicAlarmForm from '../../components/CreateAlarmClassicForm';
import { useTheme } from 'react-native-paper';

interface Route {
  key: string;
  title: string;
}

const initialLayout = { width: 300 };
export default function CreateAlarmsScreen() {
    const [index, setIndex] = useState(0);
    const theme = useTheme();
    const [routes] = useState([
      { key: 'advanced', title: 'Avancé' },
      { key: 'classic', title: 'Classique' },
    ]);

    const renderScene = ({ route }: { route: Route }) => {
      switch (route.key) {
        case 'advanced':
          return <AdvancedAlarmForm />;
        case 'classic':
          return <ClassicAlarmForm editing={false} alarmId={''} />;
        default:
          return null;
      }
    };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: theme.colors.primary}}
          indicatorStyle={{ backgroundColor: theme.colors.primaryContainer }}
        />
      )}
    />
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
  scene: {
    flex: 1,
  }
});
