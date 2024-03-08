import React, { useContext, useState } from 'react';
import {  StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import client, { PageContext } from '../../services/api/apolloClient';
import { LOGOUT_USER } from '../../services/api/graphqlService';
import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TabTwoScreen() {
    const setIsLogged = useContext(PageContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [logout, { loading, error }] = useLazyQuery(LOGOUT_USER);

    if (loading) return <ActivityIndicator />;
    if (error) setErrorMessage(error.message);

    const handleDisconnect = async () => {
        logout().then(value => {
            AsyncStorage.removeItem("token").then(() => {
                client.clearStore().then(value => {
                    setIsLogged(false);
                });
            })
        }).catch(err => {
            setErrorMessage(err.message);
        });
    };

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
                <List.Accordion
                    title="Thèmes"
                    left={() => <List.Icon style={styles.icon} icon="palette" />}
                >
                    <ThemeChoice />
                </List.Accordion>
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
                    <List.Item title="Notifications" 
                        left={() => <List.Icon style={styles.icon} icon="alarm-light" />}
                        right = {() => <List.Icon style={styles.icon} icon={notificationsAutorisees ? "check-bold" : "close"}/>}
                        onPress={() => Linking.openSettings()}
                    />
                </List.Accordion>
            </View>
            
            <View style={styles.button}>
                <Button mode="contained" onPress={handleDisconnect} disabled={false}>
                    Se deconnecter
                </Button> 
            </View>
            <Text>{errorMessage}</Text>
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