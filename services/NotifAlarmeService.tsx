import { Button, Platform } from 'react-native';
import { NotifAlarme } from '../models/NotifAlarme';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { de } from 'react-native-paper-dates';

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


// FONCTIONS //
// Fonction pour programmer une notification
export async function schedulePushNotification(notifAlarme: NotifAlarme) {
  // Prepare the notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('alarm', {
      name: 'Alarme notifications',
      importance: Notifications.AndroidImportance.HIGH,
      sound: undefined, // <- for Android 8.0+, see channelId property below
    });
  }
  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    content: {
      categoryIdentifier: 'alarme',
      title: notifAlarme.title,
      body: notifAlarme.body,
      data: { data: notifAlarme.id },
      sound: notifAlarme.sound,
    },
    trigger: { 
      date: new Date(Date.now()+1000 ),
      channelId: 'alarm',
    },
  });
}

// Fonction pour enregistrer le token de l'appareil
export async function registerForPushNotificationsAsync() {
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
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}

/*
// TESTS //
// Objet de test
let notifAlarme: NotifAlarme = {
  id: 0,
  title: "c'est l'heure",
  body: 'le president a besoin de vous!',
  sound: true,
  date: new Date(Date.now()+1000),
};
// Fonction pour tester l'envoi de notification à la demande
export function Test(){
  return (
    <Button title="Appuyer pour envoyer une notification" 
            onPress={async () => { 
              await schedulePushNotification(notifAlarme);
            }}
    />
  );

}
*/