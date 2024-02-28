import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';

interface InputTimePickerProps {
  label: string;
  optional: boolean;
  control: Control<any,object>;
  name: keyof {
    Name: string;
    Departure: string;
    Arrival: string;
    DepartureTime: { hours: number; minutes: number };
    ArrivalTime: { hours: number; minutes: number };
    TimeTriggered: string;
  };
  toggled: boolean;
  onToggleSwitch:any;
  setValue: UseFormSetValue<{
    Name: string;
    Departure: string;
    Arrival: string;
    DepartureTime: { hours: number; minutes: number };
    ArrivalTime: { hours: number; minutes: number };
    TimeTriggered: { hours: number; minutes: number };
  }>;
}

const InputTimePicker = ({ label, optional, control, name, toggled, onToggleSwitch, setValue }: InputTimePickerProps) => {
  const [visible, setVisible] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setValue(name, { hours: hours, minutes: minutes });
      setVisible(false);
    },
    [setVisible, control]
  );

  const onToggleTime = () => {
    onToggleSwitch();
  };

  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <>
              <Text onPress={() => setVisible(true)}>
                {field.value && typeof field.value === 'object'
                  ? `${field.value.hours}:${field.value.minutes}`
                  : field.value === null
                  ? '__:__'
                  : 'Invalid Value'}
              </Text>
              <TimePickerModal visible={visible} onDismiss={onDismiss} onConfirm={onConfirm} />
            </>
          );
        }}
      />
      {optional && <Switch value={toggled} onValueChange={onToggleTime} />}
    </View>
  );
};

export default InputTimePicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

