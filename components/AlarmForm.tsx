import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { LocationObject } from 'expo-location';
import GeolocationService from '../services/GeolocationService';
import { useRouter } from 'expo-router';
/**
 * AlarmForm component for setting up alarms.
 */
const AlarmForm = () => {
  const navigation = useRouter();
  const { getLocation } = GeolocationService();
  const { control, handleSubmit } = useForm();
  const [jsonFile, setJsonFile] = useState(null);
  const [location, setLocation] = useState<LocationObject | null>();

  /**
   * Retrieves the device's coordinates using GeolocationService.
   */
  const getCoordinates = async () => {
    try {
      const locationResult: LocationObject | null = await getLocation();
      
      if (locationResult) {
        console.log("Altitude:", locationResult.coords.altitude);
        console.log("Longitude:", locationResult.coords.longitude);
        setLocation(locationResult);
      } else {
        console.log("Location not available.");
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  /**
   * Handles form submission.
   * @param {Object} data - Form data.
   */
  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    console.log('JSON File:', jsonFile);
    setJsonFile(null);
  };
  

  return (
    <View>
      <Text>Set Up Alarms</Text>

      <Button title="Importer un emploi du temps" onPress={()=> navigation.push('/pages/imports')} />

      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            placeholder="Durée entre le réveil et l'arrivée"
            onChangeText={field.onChange}
            value={field.value}
            style={{ backgroundColor: 'white', padding: 10 }}
          />
        )}
        name="duration"
        rules={{ required: 'Entrez une durée en minutes' }}
      />

      <Button title="Créer les alarmes" onPress={handleSubmit(onSubmit)} />
      <Button title="Récupérez mes coordonnées" onPress={getCoordinates} />
    </View>
  );
};
export default AlarmForm;

