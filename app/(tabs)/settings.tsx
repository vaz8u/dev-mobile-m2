import React, { useState } from 'react';
import {  StyleSheet, Appearance, Linking } from 'react-native';
import { View } from '../../components/Themed';
import { Badge, Button, Divider, List, Switch, TextInput } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import RNCalendarEvents from 'react-native-calendar-events';

import ThemeChoice from '../../components/ThemeChoice';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
    const handleDisconnect = () => {
        console.log("deconnecter")
    };
    const navigation = useRouter();

    // Switch du dark mode
    const [isSwitchOn, setIsSwitchOn] = React.useState(Appearance.getColorScheme() === 'dark' ? true : false);
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if(isSwitchOn)
            Appearance.setColorScheme('light');
        else
            Appearance.setColorScheme('dark');
    };

    const [localisationAutorisee, setLocalisationAutorisee] = useState(false);
    const [notificationsAutorisees, setNotificationsAutorisees] = useState(false);
    const [calendrierAutorisees, setCalendrierAutorisees] = useState(false);

    const checkAutorisations = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status === 'granted')
            setNotificationsAutorisees(true);
        else
            setNotificationsAutorisees(false);
        {
            const { status } = await Location.getForegroundPermissionsAsync();
            setLocalisationAutorisee(status === 'granted');
        }
        let requete = await RNCalendarEvents.requestPermissions();
        if(requete !== 'authorized')
            setCalendrierAutorisees(false);
        else
            setCalendrierAutorisees(true);
    }

    const clickLocalisation = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status === 'granted')
            setLocalisationAutorisee(true);
        else {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setLocalisationAutorisee(status === 'granted');
        }
    }

    return (
        <View>
            <View>
                <List.Item
                    title="Nom d'utilisateur"
                    description="user"
                    left={() => <List.Icon style={styles.icon} icon="account" />}
                />
                <Divider />
                <List.Accordion
                    title="Thèmes"
                    left={() => <List.Icon style={styles.icon} icon="palette" />}
                >
                    <ThemeChoice />
                </List.Accordion>
                <Divider />
                <List.Accordion
                    title="Autorisations"
                    left={() => <List.Icon style={styles.icon} icon="lock" />}
                    onPress={checkAutorisations}
                >
                    <List.Item title="Localisation" 
                        left={() => <List.Icon style={styles.icon} icon="crosshairs-gps" />}
                        right = {() => <List.Icon style={styles.icon} icon={localisationAutorisee ? "check-bold" : "close"}  />}
                        onPress={() => clickLocalisation()}
                    />
                    <Divider />
                    <List.Item title="Notifications" 
                        left={() => <List.Icon style={styles.icon} icon="alarm-light" />}
                        right = {() => <List.Icon style={styles.icon} icon={notificationsAutorisees ? "check-bold" : "close"}/>}
                        onPress={async () => await Notifications.requestPermissionsAsync()}
                    />
                    <Divider />
                    <List.Item title="Calendriers" 
                        left={() => <List.Icon style={styles.icon} icon="calendar" />}
                        right = {() => <List.Icon style={styles.icon} icon={calendrierAutorisees ? "check-bold" : "close"}/>}
                        onPress={() => Linking.openSettings()}
                    />
                </List.Accordion>
                <Divider />
                <List.Item
                    style={{backgroundColor: 'white'}}
                    title="Imports calendriers"
                    left={() => <List.Icon style={styles.icon} icon="calendar-import" />}
                    right = {() => <List.Icon style={styles.icon} icon="chevron-right" />}
                    onPress={() => navigation.push('/pages/imports')}
                />
                <Divider />
            </View>
            
            <View style={styles.button}>
                <Button mode="contained" onPress={handleDisconnect} disabled={false}>
                    Se deconnecter
                </Button> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
