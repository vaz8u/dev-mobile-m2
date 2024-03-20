import { set } from 'mongoose';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Card, Button, Text, Dialog, List } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { Calendrier, Evenement } from '../../models/Evenement';

const HeureArrivee = (
    { control, errors }
) => {

  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [heureEstimee, setHeureEstimee] = useState('Non défini');
  const onDismissTimePicker = useCallback(() => {
    setVisibleTimePicker(false);
  }, [setVisibleTimePicker]);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(!visible);

  const calendriers: {[key: string]: Calendrier} = {
    "Calendrier 1": new Calendrier(
      [
        new Evenement(
          "Evenement 1",
          new Date("2024-03-30T00:00:00"),
          new Date("2024-03-30T23:59:59"),
          "Lieu 1",
          "Description 1",
          "Calendrier 1"
        ),
        new Evenement(
          "Evenement 2",
          new Date("2024-03-30T00:00:00"),
          new Date("2024-03-30T23:59:59"),
          "Lieu 2",
          "Description 2",
          "Calendrier 1"
        )
      ],
      "Calendrier 1",
      "red"
    ),
    "Calendrier 2": new Calendrier(
      [
        new Evenement(
          "Evenement 3",
          new Date("2024-03-29T00:00:00"),
          new Date("2024-03-29T23:59:59"),
          "Lieu 3",
          "Description 3",
          "Calendrier 2"
        ),
        new Evenement(
          "Evenement 4",
          new Date("2024-03-30T00:00:00"),
          new Date("2024-03-30T23:59:59"),
          "Lieu 4",
          "Description 4",
          "Calendrier 2"
        )
      ],
      "Calendrier 2",
      "blue"
    )
  };

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
          <Button style={{marginTop:2}} mode='contained' onPress={() => showDialog()}>Lier à un Emploi du temps</Button>
          
          {visible && 
          <List.Section>
            {Object.keys(calendriers).map((calendrier) => {
              return (
                <List.Accordion
                  key={calendrier}
                  title={calendrier}
                  left={(props) => <List.Icon {...props} icon="calendar-import" color={calendriers[calendrier].couleur} />}
                >
                  {calendriers[calendrier].evenements.map((evenement) => {
                    return (
                      <List.Item
                        key={evenement.titre}
                        title={`${evenement.titre} -> ${evenement.startDate.getHours()}:${evenement.startDate.getMinutes()}`}
                        description={evenement.description}
                        onPress={() => {
                          setHeureEstimee(evenement.startDate.getHours()+':'+evenement.startDate.getMinutes());
                          onChange(evenement.startDate.getHours()+':'+evenement.startDate.getMinutes());
                          setVisible(false);
                        }}
                      />
                    );
                  })}
                </List.Accordion>
              );
            }
            )}
          </List.Section>
          }


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