import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

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
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  
  const { getLocation } = GeolocationService();
  const { getLocationWithAdresse } = GeolocationService();
  const { getReverseLocation } = GeolocationService();

  const getCurrentLocation = () => {
    console.log("Getting location...");
    getLocation()
      .then((location) => {
        console.log("Current location:", location);
        if(location?.coords.latitude != undefined && location?.coords.longitude != undefined)
          getReverseLocation(location?.coords.latitude, location?.coords.longitude).then((locationAdress) =>{
            console.log("Current location:", locationAdress[0]);
            const newLocation = locationAdress[0].country + ", " + locationAdress[0].city + " " + locationAdress[0].postalCode + ", " +  locationAdress[0].streetNumber + " " + locationAdress[0].street;
            onChange(newLocation);
          })
          .catch((error) => {
            console.error("Error getting location:", error);
          });
      })
      .catch((error) => {
        console.error("Error getting location:", error);
      });
  };
  

 const focusShowMap = () => {
    getLocation()
      .then((location) => {
        if(location?.coords.latitude != undefined && location?.coords.longitude != undefined)
            setMarkerPosition({
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude
            })
            setShowMap(true);
      })
      .catch((error) => {
        console.error("Error getting location:", error);
      });
 }

const handleTextInputChange = (text: string) => {
    onChange(text);
    getLocationWithAdresse(text)
};

  return (
    <View style={styles.inputContainer}>
        <TextInput label={label} value={value} mode="outlined" style={styles.textField}
        placeholder={placeholder} right={<TextInput.Icon icon="close" />}
        onChangeText={handleTextInputChange} onBlur={onBlur} onFocus={() => focusShowMap()}/>
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
      },
    map:{
      position: 'absolute',
      top: 0, 
      left: 0,
      width: '100%',
      height: 450,
      zIndex: 1000
    }
});
