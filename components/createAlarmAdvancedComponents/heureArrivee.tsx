import { set } from 'mongoose';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

const HeureArrivee = (
    { control, errors }
) => {

  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [heureEstimee, setHeureEstimee] = useState('Non défini');
  const onDismissTimePicker = useCallback(() => {
    setVisibleTimePicker(false);
  }, [setVisibleTimePicker]);

  const handleChange = (hoursAndMinutes: {
    hours: number;
    minutes: number;
},joe)=> {
    let { hours, minutes } = hoursAndMinutes;
    let hoursString = hours.toString();
    let minutesString = minutes.toString();
    if(hours < 10){
      hoursString = '0'+hours;
    }
    if(minutes < 10){
      minutesString = '0'+minutes;
    }
    setHeureEstimee(`${hoursString}:${minutesString}`);
    joe(`${hoursString}:${minutesString}`);
    setVisibleTimePicker(false);
    return `${hoursString}:${minutesString}`;
  }

    return (
      <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Card style={styles.cartes}>
        <Card.Title title={`Heure d'arrivée :  ${heureEstimee}`} titleStyle={styles.carteTitre} />
        <Card.Content>
          <Button mode='contained' onPressIn={onBlur} onPress={() => setVisibleTimePicker(true)}>Choisir une heure</Button>
          <Button style={{marginTop:2}} mode='contained' onPress={() => setVisibleTimePicker(true)}>Lier à un Emploi du temps</Button>

        <TimePickerModal 
          visible={visibleTimePicker} 
          onDismiss={onDismissTimePicker} 
          onConfirm={(data) => value = handleChange(data,onChange)} />
          {errors.heureArrivee && <Text style={styles.text}>Il n'y a pas d'heure d'arrivée</Text>}
        </Card.Content> 
      </Card>
      )}
      name="heureArrivee"
    />
    );
};

const styles = StyleSheet.create({
    cartes:{
        marginTop:5,
      },
      carteTitre:{
        fontSize:18,
        fontWeight:'bold'
      },
      text:{
        color:"red"
      }
});
export default HeureArrivee;