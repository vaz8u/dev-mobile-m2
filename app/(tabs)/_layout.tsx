import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';

import { Button, Icon, Text } from 'react-native-paper';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: Readonly<{
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}>) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function TabLayout() {
  const navigation = useRouter();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,
      }}>
       <Tabs.Screen
        name="index"
        options={{
          title: 'Alarmes',
          tabBarIcon: ({ color }) => <Icon color={color} source="alarm" size={28}/>,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
          }
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendrier',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
          },
          tabBarIcon: ({ color }) => <Icon color={color} source="calendar" size={28}/>,
        }}
      />
      <Tabs.Screen
        name="createAlarms"
        options={{
          href: null,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
          },
          title: 'Mes alarmes > Créer'
        }}
      />
      <Tabs.Screen
        name="viewAlarm"
        options={{
          href: null,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
          },
          title: 'Mes alarmes > Alarme'
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
          },
          tabBarIcon: ({ color }) => <Icon color={color} source="cog" size={28}/>,
        }}
      />
      <Tabs.Screen
        name="alarmSetup"
        options={{
          title: 'alarmSetup',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
    
  );
}

const styles = StyleSheet.create({
  buttonConnexion:{
    margin: 5
  }
});