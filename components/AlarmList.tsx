import React from 'react';
import { StyleSheet } from 'react-native';
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
    
    const onToggleSwitch = () => { 
        props.onUpdate('enable', !props.enable);
        if (!props.enable) {
            handleActivate(props._id);
        } else {
            handleDeactivate(props._id);
        }
    };


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

    return (
      <List.Item 
            style={styles.item}
            title={props.title}
            description={props.description}
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
                    <Switch value={props.enable} onValueChange={onToggleSwitch}/>
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
