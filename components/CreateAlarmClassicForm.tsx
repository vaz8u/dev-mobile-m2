import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Button, TextInput, Text } from 'react-native-paper';
import ToggleParameter from './ToggleParameter';
import InputTimePicker from './InputTimePicker';
import { CreateAlarmInput } from '../wake-up-api/src/alarms/dto/create-alarm.input';
import { GET_ALARMS, useCreateAlarm, useGetAlarm, useGetAlarms, useUpdateAlarm } from '../services/api/graphqlService';
import { formatToISOString, getHoursFromAlarmTime, getMinutesFromAlarmTime, parseAlarmDate, parseAlarmTime } from '../services/DateParserService';
import { DatePicker } from './DatePicker';

interface ClassicAlarmFormProps {
  editing: boolean;
  alarmId: string;
}
const ClassicAlarmForm = ({ editing, alarmId }: ClassicAlarmFormProps) => {
  const navigation = useRouter();
  const [isSwitchToggled, setIsSwitchToggled] = useState(false);
  const [isAlarmSoundActivated, setIsAlarmSoundActivated] = useState(false);
  const [isVibratorActivated, setIsVibratorActivated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [createAlarm] = useCreateAlarm();
  const [updateAlarm] = useUpdateAlarm();
  const { refetch } = useGetAlarms();
  const { alarm } = useGetAlarm(alarmId);

  const { control, setValue, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      Name: "",
      Departure: "",
      Arrival: "",
      DepartureTime: { hours:12, minutes:0 },
      ArrivalTime: {hours:12, minutes:0 },
      TimeTriggered: {hours:12, minutes:0}
    },
  });

  useEffect(() => {
    if(editing && alarm){
      const { name, triggeredDate, alarmSound, vibratorSound } = alarm;
      setValue("Name", name);
      setValue("TimeTriggered", {
        hours: getHoursFromAlarmTime(parseAlarmTime(triggeredDate)),
        minutes: getMinutesFromAlarmTime(parseAlarmTime(triggeredDate))
      });
      console.log(parseAlarmDate(triggeredDate));
      setSelectedDate(new Date(parseAlarmDate(triggeredDate)));
      setIsAlarmSoundActivated(alarmSound);
      setIsVibratorActivated(vibratorSound);
    }
  }, [editing, alarm]);
  const handleCancelButtonPress = () => {
    navigation.push("/");
  };
  
  const onSubmit = async (data: any) => {
    try {
      console.log("Affichage des données:");
      console.log("Nom de l'alarme: ", data.Name);
      console.log("Alarme à : ", data.TimeTriggered.hours, "h", data.TimeTriggered.minutes);
      console.log("AlarmeISO : ", formatToISOString(selectedDate,data.TimeTriggered.hours,data.TimeTriggered.minutes));
      console.log("Son de l'alarme: ", isAlarmSoundActivated);
      console.log("Vibreur: ", isVibratorActivated);
  
      console.log(data.TimeTriggered);
      const input: CreateAlarmInput = {
        name: data.Name,
        triggeredDate: formatToISOString(selectedDate,data.TimeTriggered.hours,data.TimeTriggered.minutes),
        alarmSound: isAlarmSoundActivated,
        vibratorSound: isVibratorActivated,
        activated: true
      };
      
      if(editing) {
        await updateAlarm({
          variables: {
            updateAlarmInput: {
              id: alarmId,
              name: data.Name,
              triggeredDate: formatToISOString(selectedDate,data.TimeTriggered.hours,data.TimeTriggered.minutes),
              alarmSound: isAlarmSoundActivated,
              vibratorSound: isVibratorActivated,
            },
            refetchQueries: [{ query: GET_ALARMS }],
          },
        });
      } else {
        await createAlarm({ variables: { alarmInput: input } });
      }
      refetch();
      navigation.push("/");
    } catch (error) {
      console.error('Error creating alarm:', error);
    }
  };

  const handleToggleSwitch = () => {
    setIsSwitchToggled(!isSwitchToggled);
  };

  const handleToggleParameter = (paramTitle: string) => {
    if (paramTitle === 'Son de l\'alarme') {
      setIsAlarmSoundActivated(!isAlarmSoundActivated);
    } else if (paramTitle === 'Vibreur') {
      setIsVibratorActivated(!isVibratorActivated);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={[styles.scene]}>
    <Controller control={control} rules={{required: true}}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput label="Nom" value={value} mode="outlined"
            placeholder="Placeholder" right={<TextInput.Icon icon="close" />}
            onBlur={onBlur}
            onChangeText={onChange}/>
          )}
          name="Name"/>
    <Controller control={control} rules={{required: true}}
      render={({ field: { onChange, onBlur, value } }) => (
        <InputTimePicker label={"Déclenchement :"} optional={false} control={control} setValue={setValue} name={'TimeTriggered'} toggled={false} onToggleSwitch={() => handleToggleSwitch}></InputTimePicker>
      )}
    name="TimeTriggered"/>
    {errors.TimeTriggered && <Text style={[styles.text]}>This is required.</Text>}
    <ToggleParameter paramTitle="Son de l'alarme" isParamActivated={isAlarmSoundActivated} onToggle={handleToggleParameter}></ToggleParameter>
    <ToggleParameter paramTitle="Vibreur" isParamActivated={isVibratorActivated} onToggle={handleToggleParameter}></ToggleParameter>
    <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange}></DatePicker>
    <View style= {styles.row}>
        <Button mode="contained" onPress={handleCancelButtonPress} disabled={false}>
            Annuler
        </Button>
        {editing ? (
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              Modifier
          </Button>
        ) : (
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              Créer
          </Button>
        )}
    </View>
  </View>
  );
};

export default ClassicAlarmForm;
const styles = StyleSheet.create({
    scene: {
        flex: 1,
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
      },
    text:{
      color:"red"
    }
});