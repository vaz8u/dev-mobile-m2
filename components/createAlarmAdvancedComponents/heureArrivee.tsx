import { set } from 'mongoose';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Card, Button, Text, Dialog, List } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { Calendrier, Evenement } from '../../models/Evenement';
import { lienHTMLenCalendrier } from '../../services/ImportsCalendrier';


const HeureArrivee = (
    { control, errors }
) => {

  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [heureEstimee, setHeureEstimee] = useState('Non défini');
  const onDismissTimePicker = useCallback(() => {
    setVisibleTimePicker(false);
  }, [setVisibleTimePicker]);
  const [visible, setVisible] = useState(false);
  const [calendriers, setCalendriers] = useState<Calendrier[]>([]);
  const [chargement, setChargement] = useState(false);

  const showDialog = async () => {
    setChargement(true);
    setVisible(!visible);
    if(calendriers.length === 0)
      setCalendriers(await lienHTMLenCalendrier());
    setChargement(false);
  }

  

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

  const showDate = (date: Date): string => {
    //  dd/mm/yyyy
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
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
          <Button loading={chargement} style={{marginTop:2}} mode='contained' onPress={async () =>await showDialog()}>Lier à un Emploi du temps</Button>
          {visible && 
          <List.Section>

{calendriers.map((calendrier, index) => (
          <List.Accordion
            key={index}
            title={calendrier.nom.toUpperCase()}
            left={(props) => <List.Icon {...props} icon="calendar-import" color={calendrier.couleur} />}
          >
            {calendrier.evenements.map((evenement, i) => (
              <List.Item
                key={i}
                title={evenement.titre}
                left={(props) => <Text>{`${evenement.startDate.getHours()}:${evenement.startDate.getMinutes()}`}
                </Text>}
                description={showDate(evenement.startDate)}
                onPress={() => {
                  setHeureEstimee(evenement.startDate.getHours()+':'+evenement.startDate.getMinutes());
                  onChange(evenement.startDate.getHours()+':'+evenement.startDate.getMinutes());
                  setVisible(false);
                }}
              />
            ))}
          </List.Accordion>
        ))
      }
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