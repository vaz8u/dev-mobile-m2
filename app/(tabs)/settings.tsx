import React, { useContext, useState } from 'react';
import {  StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import client, { PageContext } from '../../services/api/apolloClient';
import { LOGOUT_USER } from '../../services/api/graphqlService';
import { useLazyQuery } from '@apollo/client';

export default function TabTwoScreen() {
    const setIsLogged = useContext(PageContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [logout, { loading, error }] = useLazyQuery(LOGOUT_USER);

    if (loading) return <ActivityIndicator />;
    if (error) setErrorMessage(error.message);

    const handleDisconnect = async () => {
        logout().then(value => {
            client.clearStore()
            setIsLogged(false);
        }).catch(err => {
            setErrorMessage(err.message);
        });
    };

    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={handleDisconnect} disabled={false}>
                Se deconnecter
            </Button>
            <Text>{errorMessage}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
