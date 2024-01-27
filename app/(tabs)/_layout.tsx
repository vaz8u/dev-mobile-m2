import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { Icon } from 'react-native-paper';
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
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
       <Tabs.Screen
        name="index"
        options={{
          title: 'Alarmes',
          tabBarIcon: ({ color }) => <Icon color={color} source="alarm" size={28}/>,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendrier',
          tabBarIcon: ({ color }) => <Icon color={color} source="calendar" size={28}/>,
        }}
      />
      <Tabs.Screen
        name="createAlarms"
        options={{
          href: null,
          title: 'Mes alarmes > Créer'
        }}
      />
      <Tabs.Screen
        name="viewAlarm"
        options={{
          href: null,
          title: 'Mes alarmes > Alarme'
        }}
      />
      {/* <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color }) => <Icon color={color} source="settings" size={28}/>,
        }}
      /> */}
    </Tabs>
    
  );
}
