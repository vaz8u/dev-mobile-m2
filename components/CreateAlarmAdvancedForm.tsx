import { View, Text } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { List, Switch, TextInput, Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import ToggleParameter from './ToggleParameter';
import InputLocation from './InputLocation';
import InputTimePicker from './InputTimePicker';
import { Controller, Form, useForm } from "react-hook-form";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRouter } from 'expo-router';
//Utiliser React Hook Form
const AdvancedAlarmForm = () => {
  const navigation = useRouter();
  
  const handleCancelButtonPress = () => {
    navigation.push("/");
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Departure: "",
      Arrival: ""
    },
  });
  const onSubmit = (data: any) => {
    console.log("oui");
    console.log(data);
    
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
        {errors.Name && <Text style={[styles.text]}>This is required.</Text>}
        <Controller control={control} rules={{required: true}}
          render={({ field: { onChange, onBlur, value } }) => (
          <InputLocation label={"Départ"} value={value} placeholder={"Placeholder"} onBlur={onBlur}
          onChange={onChange}></InputLocation>
          )}
        name="Departure"/>
        {errors.Departure && <Text style={[styles.text]}>This is required.</Text>}
          <InputTimePicker label={"Heure de départ :"}></InputTimePicker>
          <Controller control={control} rules={{required: true}}
          render={({ field: { onChange, onBlur, value } }) => (
          <InputLocation label={"Arrivée"} value={value} placeholder={"Placeholder"} onBlur={onBlur}
          onChange={onChange}></InputLocation>
          )}
          name="Arrival"/>
        {errors.Arrival && <Text style={[styles.text]}>This is required.</Text>}
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