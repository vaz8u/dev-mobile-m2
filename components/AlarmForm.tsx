import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const AlarmForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [jsonFile, setJsonFile] = useState(null);

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    console.log('JSON File:', jsonFile);

    
    setJsonFile(null);
  };

  const handleImportJson = () => {
    Alert.alert('Import JSON', 'Implement JSON file import functionality here');
  };

  return (
    <View>
      <Text>Set Up Alarms</Text>

      <Button title="Importer un emploi du temps" onPress={handleImportJson} />

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
    </View>
  );
};

export default AlarmForm;
