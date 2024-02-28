import React from 'react';
import {  StyleSheet, View } from 'react-native';

import { Button } from 'react-native-paper';
import ThemeChoice from '../../components/ThemeChoice';

export default function TabTwoScreen() {

    const handleDisconnect = () => {
        console.log("deconnecter")
    };

    return (
        <View style={styles.container}>
            <ThemeChoice></ThemeChoice>
            <Button mode="contained" onPress={handleDisconnect} disabled={false}>
                Se deconnecter
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
