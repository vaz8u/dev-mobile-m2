import React from 'react';
import {  StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { Button } from 'react-native-paper';

export default function TabTwoScreen() {

    const handleDisconnect = () => {
        console.log("deconnecter")
    };

    return (
        <View style={styles.container}>
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
    },
});
