import { Platform, Vibration } from 'react-native';
import { NotifAlarme } from '../models/NotifAlarme';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { List, useTheme } from 'react-native-paper';
import { Alarme } from '../models/Alarme';
import  Constants  from 'expo-constants';
import { set } from 'react-hook-form';

let vibrationInterval: string | number | NodeJS.Timeout | undefined;

// CONFIGURATION DES NOTIFICATIONS // 
// Attribution d'un handler pour les notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Boutons de la notification
Notifications.setNotificationCategoryAsync('alarme', [
  {
    identifier: 'effacer',
    buttonTitle: 'Faire disparaître',
    options: {
      opensAppToForeground: false,
    },
  },
  {
    identifier: 'snooze',
    buttonTitle: 'Snooze (+5 minutes)',
    options: {
      opensAppToForeground: false,
      isDestructive: true,
    },
  },
], {});

Notifications.addNotificationReceivedListener(() => {
  if (Platform.OS === 'ios') {
    vibrationInterval = setInterval(() => {
      Vibration.vibrate([500, 300, 200, 100, 500]);
    }, 1000); // Vibrate every 1 second
  }
});

Notifications.addNotificationResponseReceivedListener(async response => {
  clearInterval(vibrationInterval);
  // Lorsque le bouton 'snooze' est cliqué
  if (response.actionIdentifier === 'snooze') {
    await schedulePushNotification(notifAlarmetest);
  }
  
});

// FONCTIONS //
// Fonction pour programmer une notification
export async function schedulePushNotification(notifAlarme: NotifAlarme) {
  registerForPushNotificationsAsync();
  // Prepare the notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('alarm', {
      name: 'Alarme notifications',
      importance: Notifications.AndroidImportance.HIGH,
      sound: notifAlarme.sound ? String(notifAlarme.sound) : undefined,
    });
  }
  console.log(notifAlarme.date);
  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    content: {
      categoryIdentifier: 'alarme',
      title: notifAlarme.title,
      body: notifAlarme.body,
      data: notifAlarme.data,
      sound: notifAlarme.sound,
      vibrate: notifAlarme.vibrate ? [0, 20, 250, 4] : [],
    },
    trigger: { 
      date: notifAlarme.date,
      channelId: 'alarm',
    },
  });
}

// Fonction pour enregistrer le token de l'appareil
async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas?.projectId })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}

export async function setNotification(alarme:Alarme){
    let notifAlarme: NotifAlarme = {
      id: alarme.name,
      title: alarme.name,
      body: 'Trajet : ' + alarme.departure + ' -> ' + alarme.arrival + ' : ' + alarme.arriveTime,
      sound: alarme.alarmSound ? 'SansTitre.waw' : false,
      date: new Date(alarme.triggeredDate),
      data: alarme,
      vibrate: alarme.vibratorSound,
    };
    console.log(notifAlarme);
    try{ 
      await schedulePushNotification(notifAlarme);
      return true;
    }
    catch(e){
      return false;
    }
}


// TESTS //
// Objet de test
let notifAlarmetest: NotifAlarme = {
  id: '0',
  title: "Alarme snooze!",
  body: 'Appuyer sur la notification pour arrêter la vibration',
  sound: 'SansTitre.waw',
  date: new Date(Date.now() + 300000),
  data: null,
  vibrate : [0, 20, 250, 4],
};

// Fonction pour tester l'envoi de notification à la demande
export function Test(){
  const theme = useTheme();

  return (
    <List.Item
      style={{ backgroundColor: theme.colors.surface}}
      title="Tester les notifications"
      left={() => <List.Icon style={{marginLeft: 10}} icon="alarm-light"/>}
      right = {() => <List.Icon style={{marginLeft: 10}} icon="chevron-left" />}
      onPress={async () => await schedulePushNotification(notifAlarmetest)}
    />
  );

}
