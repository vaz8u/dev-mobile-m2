import * as Notifications from 'expo-notifications';
import { schedulePushNotification } from './../../../services/NotifAlarmeService'; // Assurez-vous d'importer correctement le fichier contenant les fonctions à tester

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  setNotificationCategoryAsync: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(),
}));

jest.mock('expo-device', () => ({
  isDevice: jest.fn(),
}));

describe('Notification functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should schedule a notification', async () => {
    const notifAlarme = {
      title: 'Test Title',
      body: 'Test Body',
      sound: 'default',
      id: 123,
      date: new Date(Date.now()+1000 ),
    };
    await schedulePushNotification(notifAlarme);
    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalled();
  });
});
