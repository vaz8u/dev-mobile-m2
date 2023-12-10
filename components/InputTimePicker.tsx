import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { useForm, Control, Controller, FieldValues } from 'react-hook-form';

interface Time {
  hours: number;
  minutes: number;
}

interface InputTimePickerProps {
  label: string;
  optional: boolean;
  control: Control<any,object>;
  name: string;
  toggled: boolean;
  onToggleSwitch:any;
}

const InputTimePicker = ({ label, optional, control, name, toggled, onToggleSwitch }: InputTimePickerProps) => {
  const { setValue, getValues } = useForm();
  const [visible, setVisible] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      console.log({ hours, minutes });
  
      setValue(name, { hours: hours, minutes: minutes });

      console.log(getValues());
      
      // This should log the updated values after setValue has completed
  
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
        defaultValue={{hours:12,minutes:15}}// Set the default value with type annotation
        render={({ field }) => {
          console.log('Initial field value:', field.value);
          return (
            <>
              <Text onPress={() => setVisible(true)}>
                {field.value && typeof field.value === 'object'
                  ? `${field.value.hours}:${field.value.minutes}`
                  : field.value === null
                  ? '__:__'
                  : 'Invalid Value'}
              </Text>
              <TimePickerModal visible={visible} onDismiss={onDismiss} onConfirm={onConfirm} hours={12} minutes={14} />
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
function watch(): any {
  throw new Error('Function not implemented.');
}

