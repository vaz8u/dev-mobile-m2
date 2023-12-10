import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ToggleParameter from './ToggleParameter';
import InputLocation from './InputLocation';
import InputTimePicker from './InputTimePicker';
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'expo-router';
import { useState } from 'react';

const AdvancedAlarmForm = () => {
  const navigation = useRouter();
  const [isFirstSwitchToggled, setIsFirstSwitchToggled] = useState(false);
  const [isSecondSwitchToggled, setIsSecondSwitchToggled] = useState(false);
  
  const handleCancelButtonPress = () => {
    navigation.push("/");
  };
  const handleToggleSwitch = (pickerNumber: number) => {
    if (pickerNumber === 1) {
      setIsFirstSwitchToggled(!isFirstSwitchToggled);
      setIsSecondSwitchToggled(false);
    } else if (pickerNumber === 2) {
      setIsFirstSwitchToggled(false);
      setIsSecondSwitchToggled(!isSecondSwitchToggled);
    }
  };
  const { control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      Name: "",
      Departure: "",
      Arrival: "",
      DepartureTime: { hours:12, minutes:12 },
      ArrivalTime: {hours:12, minutes:12 }
    },
  });
  const onSubmit = (data: any) => {
    console.log("oui");
    console.log(data);
  };
  function setValue(name: string, value: any, options?: any): void {
    throw new Error('Function not implemented.');
  }

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
        {errors.Name && <Text style={[styles.text]}>This is required.</Text>}
        <Controller control={control} rules={{required: true}}
          render={({ field: { onChange, onBlur, value } }) => (
          <InputLocation label={"Départ"} value={value} placeholder={"Placeholder"} onBlur={onBlur}
          onChange={onChange}></InputLocation>
          )}
        name="Departure"/>
        {errors.Departure && <Text style={[styles.text]}>This is required.</Text>}
       
          <InputTimePicker name="DepartureTime" label={"Heure de départ :"} optional={true} control={control} toggled={isFirstSwitchToggled} onToggleSwitch={() => handleToggleSwitch(1)}></InputTimePicker>
        
          <Controller control={control} rules={{required: true}}
          render={({ field: { onChange, onBlur, value } }) => (
          <InputLocation label={"Arrivée"} value={value} placeholder={"Placeholder"} onBlur={onBlur}
          onChange={onChange}></InputLocation>
          )}
          name="Arrival"/>
        {errors.Arrival && <Text style={[styles.text]}>This is required.</Text>}
        <InputTimePicker name="ArrivalTime" label={"Heure d'arrivée :"} optional={true} control={control} toggled={isSecondSwitchToggled} onToggleSwitch={() => handleToggleSwitch(2)}></InputTimePicker>
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

export default AdvancedAlarmForm;
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