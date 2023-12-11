import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import ToggleParameter from './ToggleParameter';
import InputTimePicker from './InputTimePicker';


const ClassicAlarmForm = () => {
  const navigation = useRouter();
  const [isSwitchToggled, setIsSwitchToggled] = useState(false);

  const handleCancelButtonPress = () => {
    navigation.push("/");
  };
  
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
  
  const onSubmit = (data: any) => {
    console.log("Affichage des données:");
    console.log("Nom de l'alarme: ", data.Name);
    console.log("Alarme à : ", data.TimeTriggered.hours, "h", data.TimeTriggered.minutes);
  };

  const handleToggleSwitch = () => {
    setIsSwitchToggled(!isSwitchToggled);
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
    <ToggleParameter paramTitle="Son de l'alarme"></ToggleParameter>
    <ToggleParameter paramTitle="Vibreur"></ToggleParameter>
    <View style= {styles.row}>
        <Button mode="contained" onPress={handleCancelButtonPress} disabled={false}>
            Annuler
        </Button>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Créer
        </Button>
    </View>
  </View>
  );
};

export default ClassicAlarmForm;
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
      },
    text:{
      color:"red"
    }
});