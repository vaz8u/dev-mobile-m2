import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { View } from '../components/Themed';
import AlarmList, {AlarmListInterface, Day} from '../components/AlarmList';
import { Button, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useGetAlarms, useDeleteAlarm } from '../services/api/graphqlService';

const AlarmListScreen = () => {
    const navigation = useRouter();
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [alarmList, setAlarmList] = useState<AlarmListInterface[]>([]);
    const [deleteAlarm] = useDeleteAlarm();
    const { data, refetch } = useGetAlarms();
    useEffect(() => {
        const fetchAlarms = () => {
            refetch().then((alarmsData) => {
              const fetchedAlarms = alarmsData?.data?.alarms || [];
              const updatedList = fetchedAlarms.map((alarm: any) => ({
                _id: alarm._id,
                title: alarm.name,
                description: alarm.triggeredDate,
                enable: true,
                selected: false,
                day: Day.Mercredi,
              }));
              setAlarmList(updatedList);
            }).catch((error) => {
              console.error('Error fetching alarms:', error);
            });
          };
    
        fetchAlarms();
      }, [data]);
    
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

    const handlePressOut = (alarmTitle: string, alarmId: string) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        // If it's a long press, don't redirect
        if (isPressed) {
            return;
        }
        console.log(alarmTitle);
        navigation.push({pathname:'/viewAlarm', params:{alarmTitle, alarmId}});
    };

    const cancelSelection = () => {
        setIsPressed(false);
        const updatedList: AlarmListInterface[] = alarmList.map(alarm => ({
            ...alarm,
            selected: false,
          }));
      
          setAlarmList(updatedList);
    }

    const deleteSelection = async () => {
        try {
          setIsPressed(false);
          const selectedAlarms = alarmList.filter(alarm => alarm.selected);
    
          const alarmIdsToDelete = selectedAlarms.map(alarm => alarm._id);
          await Promise.all(
            alarmIdsToDelete.map(async (alarmId:string) => {
              await deleteAlarm({
                variables: {
                  alarmId: alarmId,
                },
              }).catch(error => {
                console.error(`Error deleting alarm ${alarmId}:`, error.networkError.result.errors);
              });;
            })
          );
          setAlarmList((prevList) =>
            prevList.filter((alarm) => !alarm.selected)
          );
          await refetch();
        } catch (error) {
          console.error('Error deleting alarm:', error);
        }
      };

    const addAlarm = () => {
        const newAlarm: AlarmListInterface = {
            _id:'1',
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
            <TouchableOpacity onPressIn={() => handlePressIn(index)} onPressOut={() => handlePressOut(item.title, item._id)} >
                <AlarmList title={item.title} description={item.description} enable={item.enable} selected={item.selected} day={item.day} isSelected={isPressed}
                onUpdate={(key: keyof AlarmListInterface, newValue: any) => updateAlarmList(index, key, newValue)} _id={item._id} />
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
