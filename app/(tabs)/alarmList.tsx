import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { View } from '../../components/Themed';
import AlarmList, {AlarmListInterface, Day} from '../../components/AlarmList';
import { Button, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';

const AlarmListScreen = () => {
    const navigation = useRouter();
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const [alarmList, setAlarmList] = useState<AlarmListInterface[]>([
        { title: "Alarm 1", description: "08:00", enable: true, selected: false, day: Day.Lundi },
        { title: "Alarm 2", description: "09:00", enable: true, selected: false, day: Day.Mardi },
        { title: "Alarm 3", description: "09:00", enable: true, selected: false, day: Day.Mercredi },
    ]);

    const handlePressIn = (index: number) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        const delay = 1000;

        const id = setTimeout(() => {
            setIsPressed(true);
            alarmList[index]['selected'] = true;
        }, delay);

        setTimeoutId(id);
      };

    const handlePressOut = (alarmTitle: string) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        // If it's a long press, don't redirect
        if (isPressed) {
            return;
        }
        console.log(alarmTitle);
        navigation.push({pathname:'/viewAlarm', params:{alarmTitle}});
    };

    const cancelSelection = () => {
        setIsPressed(false);
        const updatedList: AlarmListInterface[] = alarmList.map(alarm => ({
            ...alarm,
            selected: false,
          }));
      
          setAlarmList(updatedList);
    }

    const deleteSelection = () => {
        setIsPressed(false);
        const updatedList: AlarmListInterface[] = alarmList.filter(alarm => !alarm.selected);
        setAlarmList(updatedList);
    }

    const addAlarm = () => {
        const newAlarm: AlarmListInterface = {
            title: `Alarm ${alarmList.length + 1}`,
            description: "10:00", 
            enable: true, 
            selected: false,
            day: Day.Lundi
        };

        setAlarmList(prevList => [...prevList, newAlarm]);
    };

    const updateAlarmList = <K extends keyof AlarmListInterface>(index: number, key: K, newValue: AlarmListInterface[K]) => {
        const updatedList: AlarmListInterface[] = [...alarmList];
        updatedList[index][key] = newValue;
        setAlarmList(updatedList);
    };
    
    const itemAlarm = ({ item, index }: { item: AlarmListInterface, index: number }) => (
        <View>
            <TouchableOpacity onPressIn={() => handlePressIn(index)} onPressOut={() => handlePressOut(item.title)} >
                <AlarmList title={item.title} description={item.description} enable={item.enable} selected={item.selected} day={item.day} isSelected={isPressed}
                    onUpdate={(key: keyof AlarmListInterface, newValue: any) => updateAlarmList(index, key, newValue)}
                />
            </TouchableOpacity>
            <Divider />
        </View>
      );

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <FlatList
                    data={alarmList}
                    renderItem={itemAlarm} 
                    keyExtractor={(item, index) => index.toString()}
                />
                
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={[styles.button, { display: isPressed ? 'flex' : 'none' }]}
                    onPress={() => { cancelSelection(); }} 
                >
                    Annuler
                </Button>
                <Button
                    style={[styles.button, { display: isPressed ? 'flex' : 'none' }]}
                    onPress={() => { deleteSelection(); }} 
                >
                    Supprimer
                </Button>
                <Button
                    style={[styles.button, { display: !isPressed ? 'flex' : 'none' }]}
                    icon="plus"
                    onPress={() => { addAlarm(); } } children={undefined} >
                </Button>
            </View>
        </View>
    );
}

export default AlarmListScreen;

const styles = StyleSheet.create({
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
