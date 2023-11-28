import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { List, Switch, TextInput, Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import ToggleParameter from './ToggleParameter';
import InputLocation from './InputLocation';
import InputTimePicker from './InputTimePicker';

//Utiliser React Hook Form
const AdvancedAlarmForm = () => {
  const [name, setName] = React.useState("");

  const handleCancelButtonPress = () => {
    console.log("Annuler");
  };
  return (
    <View style={[styles.scene]}>
        <TextInput label="Nom" value={name} mode="outlined"
        placeholder="Placeholder" right={<TextInput.Icon icon="close" />}
        onChangeText={name => setName(name)} />
        <InputLocation label={"Départ"} placeholder={"Placeholder"} ></InputLocation>
        <InputTimePicker label={"Heure de départ :"}></InputTimePicker>
        <InputLocation label={"Arrivée"} placeholder={"Placeholder"} ></InputLocation>
        <ToggleParameter paramTitle="Son de l'alarme"></ToggleParameter>
        <ToggleParameter paramTitle="Vibreur"></ToggleParameter>
        
        <View style= {styles.row}>
            <Button mode="contained" onPress={handleCancelButtonPress} disabled={false}>
                Annuler
            </Button>
            <Button mode="contained" onPress={handleCancelButtonPress} disabled={false}>
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
      }
});