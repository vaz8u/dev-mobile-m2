import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { List, Switch, TextInput, Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

interface InputTimePickerProps {
    label:string;
}
const InputTimePicker = ({label}:InputTimePickerProps) => {
  const [isDepartureTimeOn, setIsTimeOn] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [time, setTime] = React.useState<Time>();
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }: {hours:number, minutes:number}) => {
      setVisible(false);
      setTime({hours,minutes});
      console.log({ hours, minutes });
    },
    [setVisible]
  );
  const onToggleTime = () => {
    setIsTimeOn(!isDepartureTimeOn);
  }
  return (
    <View style={styles.inputContainer}>
        <Text onPress={() => setVisible(true)}>{label}</Text>
        {
            time ? <Text>{time.hours}:{time.minutes}</Text> :
            <Text>__:__</Text>
        }
        <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12}
            minutes={14}
        />
        <Switch value={isDepartureTimeOn} onValueChange={onToggleTime}/>
    </View>
  );
};

export default InputTimePicker;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor:'white',
        padding:10
      },
    row: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textField: {
        flex: 1, // Allow TextInput to take up remaining space
        marginRight: 8, // Add some space between TextInput and Button
        marginTop: 8,
      }
});
