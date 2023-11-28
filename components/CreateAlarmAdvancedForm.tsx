import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { List, Switch, TextInput, Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

//Utiliser React Hook Form
const AdvancedAlarmForm = () => {
  const [name, setName] = React.useState("");
  const [departure, setDeparture] = React.useState("");
  const [arrival, setArrival] = React.useState("");
  const [isAlarmSoundOn, setIsAlarmSoundOn] = React.useState(false);
  const descriptionAlarmSound = isAlarmSoundOn ? 'Activé' : 'Désactivé';
  const [isVibratorOn, setIsVibratorOn] = React.useState(false);
  const descriptionVibrator = isVibratorOn ? 'Activé' : 'Désactivé';
  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }: {hours:number, minutes:number}) => {
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible]
  );

  const onToggleAlarmSound = () => {
    setIsAlarmSoundOn(!isAlarmSoundOn);
  };
  const onToggleVibrator = () => {
    setIsVibratorOn(!isVibratorOn);
  };

  const handleCancelButtonPress = () => {
    // Add the action you want to perform when the button is pressed
    // For example, navigating to another screen
    console.log("Annuler");
  };
  return (
    <View style={[styles.scene]}>
        <TextInput label="Nom" value={name} mode="outlined"
        placeholder="Placeholder" right={<TextInput.Icon icon="close" />}
        onChangeText={name => setName(name)} />
        <View style={styles.inputContainer}>
            <TextInput label="Départ" value={departure} mode="outlined" style={styles.textField}
            placeholder="Placeholder" right={<TextInput.Icon icon="close" />}
            onChangeText={departure => setDeparture(departure)} />
            <Button mode="contained" disabled={false} icon="map-marker">
            </Button>
        </View>
        <View style={styles.inputContainer}>
            <Text>Heure de départ :</Text>
            <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
          Pick time
        </Button>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12}
              minutes={14}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput label="Arrivée" value={arrival} mode="outlined" style={styles.textField}
            placeholder="Placeholder" right={<TextInput.Icon icon="close" />}
            onChangeText={arrival => setArrival(arrival)} />
            <Button mode="contained" disabled={false} icon="map-marker">
            </Button>
        </View>
        <List.Item
        title="Son de l’alarme"
        description={descriptionAlarmSound}
        right={() => ( <Switch value={isAlarmSoundOn} onValueChange={onToggleAlarmSound} />)}
        onPress={() => {}}/>
        <List.Item
        title="Vibreur"
        description={descriptionVibrator}
        right={() => ( <Switch value={isVibratorOn} onValueChange={onToggleVibrator} />)}
        onPress={() => {}}/>
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