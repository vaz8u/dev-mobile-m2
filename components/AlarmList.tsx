import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Checkbox, List, Switch } from 'react-native-paper';
import { useActivateAlarm, useDeactivateAlarm } from '../services/api/graphqlService';

export interface AlarmListInterface {
    _id: string,
    title: string,
    description: string,
    enable: boolean,
    selected: boolean,
    day: Day
}

export enum Day {
    Lundi = 'L',
    Mardi = 'Ma',
    Mercredi = 'Me',
    Jeudi = 'J',
    Vendredi = 'V',
    Samedi = 'S',
    Dimanche = 'D',
}

const AlarmList = (props: AlarmListInterface & { isSelected: boolean, onUpdate: (key: keyof AlarmListInterface, newValue: any) => void  }) => {
    const [activateAlarmMutation] = useActivateAlarm();
    const [deactivateAlarmMutation] = useDeactivateAlarm();
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(props.enable);
    const [timeoutToggleSwitch, setTimeoutToggleSwitch] = useState<NodeJS.Timeout>();
    
    const onToggleSwitch = () => {
        setIsSwitchEnabled(!isSwitchEnabled);
        if (timeoutToggleSwitch) {
            clearTimeout(timeoutToggleSwitch);
        }
        setTimeoutToggleSwitch(setTimeout(activateOrDeactivate, 800))
    };

    const activateOrDeactivate = () => {
        props.onUpdate('enable', !props.enable);
        if (!props.enable) {
            handleActivate(props._id);
        } else {
            handleDeactivate(props._id);
        }
    }


    const handleActivate = async (id: string) => {
        try {
          await activateAlarmMutation({ variables: { id } });
        } catch (error) {
          console.error(`Error activating alarm ${id}:`, error);
        }
      };
  
      const handleDeactivate = async (id: string) => {
        try {
          await deactivateAlarmMutation({ variables: { id } });
        } catch (error) {
          console.error(`Error deactivating alarm ${id}:`, error);
        }
      };

    function affichageDateEtHeure(date: any){
        date = new Date(date);
        let jour = date.getDate();
        let mois = date.getMonth() + 1;
        let annee = date.getFullYear();
        let heure = date.getHours();
        if(heure < 10)
            heure = '0' + heure;
        let minutes = date.getMinutes();
        if(minutes < 10)
            minutes = '0' + minutes;
        return jour + '/' + mois + '/' + annee + ' ' + heure + ':' + minutes;
    }

    return (
      <List.Item 
            style={styles.item}
            title={props.title}
            description={affichageDateEtHeure(props.description)}
            left={() => ( 
                <Avatar.Text
                    style={[styles.day]}
                    label={props.day}
                    size={35}
                />
            )}
            right={() => (
                props.isSelected ? (
                    <Checkbox
                        status={props.selected ? 'checked' : 'unchecked'}
                        onPress={() => {props.onUpdate('selected', !props.selected);}}
                    />
                ) : (
                    <Switch value={isSwitchEnabled} onValueChange={onToggleSwitch}/>
                )
            )}
      />
    );
}

export default AlarmList;

const styles = StyleSheet.create({
    item:{
        width:'100%',
        padding: 10,
    },
    day:{
        alignSelf:'center'
    },
});
