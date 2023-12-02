import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import AlarmList from '../../components/AlarmList';
import { Button, Divider, IconButton } from 'react-native-paper';

export default function AlarmListScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <AlarmList/>
                <Divider/>
                <AlarmList/>
                
            </View>
            <View  style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    icon="plus"
                    onPress={() => console.log('Pressed')} >
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%"
    },
    list:{
        flex: 8
    },
    buttonContainer:{
        flex: 1
    },
    button:{
        alignSelf:"flex-end",
        backgroundColor:'#F7F2FA',
    }
    
});
