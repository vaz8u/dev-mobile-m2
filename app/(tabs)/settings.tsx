
import client, { PageContext } from "../../services/api/apolloClient";
import { LOGOUT_USER } from "../../services/api/graphqlService";
import { useLazyQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useContext, useState } from "react";
import { StyleSheet, Appearance, Linking } from "react-native";
import { ScrollView, View } from "../../components/Themed";
import {
  ActivityIndicator,
  Button,
  Text,
  Divider,
  List,
  useTheme
} from "react-native-paper";

import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import RNCalendarEvents from "react-native-calendar-events";

import ThemeChoice from "../../components/ThemeChoice";
import { useRouter } from "expo-router";
import { Test } from "../../services/NotifAlarmeService";

export default function TabTwoScreen() {

  const setIsLogged = useContext(PageContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [logout, { loading, error }] = useLazyQuery(LOGOUT_USER);
  const [isSwitchOn, setIsSwitchOn] = useState(
    Appearance.getColorScheme() === "dark" ? true : false
  );
  const [localisationAutorisee, setLocalisationAutorisee] = useState(false);
  const [notificationsAutorisees, setNotificationsAutorisees] = useState(false);
  const [calendrierAutorisees, setCalendrierAutorisees] = useState(false);
  const navigation = useRouter();
  const theme = useTheme();

  if (loading) return <ActivityIndicator />;
  if (error) setErrorMessage(error.message);

  // Switch du dark mode
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn) Appearance.setColorScheme("light");
    else Appearance.setColorScheme("dark");
  };

  const checkAutorisations = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === "granted") setNotificationsAutorisees(true);
    else setNotificationsAutorisees(false);
    {
      const { status } = await Location.getForegroundPermissionsAsync();
      setLocalisationAutorisee(status === "granted");
    }
    let requete = await RNCalendarEvents.requestPermissions();
    if (requete !== "authorized") setCalendrierAutorisees(false);
    else setCalendrierAutorisees(true);
  };

  const clickLocalisation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") setLocalisationAutorisee(true);
    else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocalisationAutorisee(status === "granted");
    }
  };

  const handleDisconnect = async () => {
    logout()
      .then((value) => {
        AsyncStorage.multiRemove(["token", "userId"]).then(() => {
          client.clearStore().then((value) => {
            setIsLogged(false);
          });
        });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <List.Item
                        title="Nom d'utilisateur"
                        description="user"
                        left={() => <List.Icon style={styles.icon} icon="account" />}
                        style={{ backgroundColor: theme.colors.surface}}
                    />
                    <Divider />
                    <List.Accordion
                        title="Thèmes"
                        left={() => <List.Icon style={styles.icon} icon="palette" />}
                        style={{ backgroundColor: theme.colors.surface}}
                    >
                        <ThemeChoice />
                    </List.Accordion>
                    <Divider />
                    <List.Accordion
                        title="Autorisations"
                        left={() => <List.Icon style={styles.icon} icon="lock" />}
                        onPress={checkAutorisations}
                        style={{ backgroundColor: theme.colors.surface}}
                    >
                        <List.Item
                          title="Localisation"
                          left={() => <List.Icon style={styles.icon} icon="crosshairs-gps" />}
                          right={() => (
                            <List.Icon
                              style={styles.icon}
                              icon={localisationAutorisee ? "check-bold" : "close"}
                            />
                          )}
                          onPress={() => clickLocalisation()}
                        />
                        <Divider />
                        <List.Item
                          title="Notifications"
                          left={() => <List.Icon style={styles.icon} icon="alarm-light" />}
                          right={() => (
                            <List.Icon
                              style={styles.icon}
                              icon={notificationsAutorisees ? "check-bold" : "close"}
                            />
                          )}
                          onPress={async () => await Notifications.requestPermissionsAsync()}
                        />
                        <Divider />
                        <List.Item
                          title="Calendriers"
                          left={() => <List.Icon style={styles.icon} icon="calendar" />}
                          right={() => (
                            <List.Icon
                              style={styles.icon}
                              icon={calendrierAutorisees ? "check-bold" : "close"}
                            />
                          )}
                          onPress={() => Linking.openSettings()}
                        />
                    </List.Accordion>
                    <Divider />
                    <List.Item                        title="Imports calendriers"
                        left={() => <List.Icon style={styles.icon} icon="calendar-import" />}
                        right = {() => <List.Icon style={styles.icon} icon="chevron-right" />}
                        onPress={() => navigation.push('/pages/imports')}
                        style={{ backgroundColor: theme.colors.surface}}
                    />
                    <Divider />
                    <Test />
                </View>
                
                <View style={styles.button}>
                    <Button mode="contained" onPress={handleDisconnect} disabled={false}>
                        Se deconnecter
                    </Button> 
                </View>
                <Text>{errorMessage}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    button_centre: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    icon: {
        marginLeft: 10,
    },
});
