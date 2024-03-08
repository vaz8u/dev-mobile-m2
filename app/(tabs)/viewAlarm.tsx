import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import ClassicAlarmForm from '../../components/CreateAlarmClassicForm';
import { useLocalSearchParams, useNavigation } from 'expo-router';


const ViewAlarmScreen = () => {
    const params = useLocalSearchParams();
    let alarmTitle = params.alarmTitle || 'Default Alarm Title';
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
          title: 'Mes alarmes > ' + alarmTitle,
        });
      }, [alarmTitle, navigation]
    );

    return (
        <View style={styles.scene}>
            <ClassicAlarmForm editing={true} alarmId={params.alarmId as string}></ClassicAlarmForm>
        </View>
    );
}

export default ViewAlarmScreen;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor:'white',
        padding:10
      },
    container:{
        flex: 1,
        width: "100%"
    },
    list:{
        flex: 8
    },
    buttonContainer:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button:{
        backgroundColor:'#F7F2FA',
        margin: 10,
    }
});
