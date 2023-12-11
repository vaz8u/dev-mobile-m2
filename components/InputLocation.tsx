import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Noop } from 'react-hook-form';
import GeolocationService from '../services/GeolocationService';

interface InputLocationProps {
    label:string;
    placeholder:string;
    onChange: (...event:any[]) => void;
    onBlur: Noop;
    value:string;
}
const InputLocation = ({label, placeholder, onChange, onBlur, value}:InputLocationProps) => { 
  const { getLocation } = GeolocationService();

  const getCurrentLocation = () => {
    console.log("Getting location...");
    getLocation()
      .then((location) => {
        console.log("Current location:", location);
      })
      .catch((error) => {
        console.error("Error getting location:", error);
      });
  };

  return (
    <View style={styles.inputContainer}>
        <TextInput label={label} value={value} mode="outlined" style={styles.textField}
        placeholder={placeholder} right={<TextInput.Icon icon="close" />}
        onChangeText={onChange} onBlur={onBlur} />
        <Button mode="contained" disabled={false} icon="map-marker" onPress={getCurrentLocation} children={undefined}>
        </Button>
    </View>
  );
};

export default InputLocation;

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
