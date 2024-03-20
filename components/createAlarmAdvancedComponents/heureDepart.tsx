import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Card,Button,Text, Portal, Dialog } from 'react-native-paper';

import { calculAlarme } from '../../services/CalculAlarmeService';
import { trajet } from '../../services/TrajetService';

const HeureDepart = (
    {transport, control, errors, getValues}
) => {

  const [enCours, setEnCours] = useState(false);
  const [texte, setTexte] = useState('Calculer');
  const [error, setError] = useState(''); 


  const [tempsTrajet, setTempsTrajet] = useState('');
  const [distanceTrajet, setDistanceTrajet] = useState('');
  const [alarmeFinale, setAlarmeFinale] = useState('Non défini');

  const hideDialog = () => setError('');
  // Calcul de l'alarme finale
  async function calculAlarmeFinale(){
    if(getValues('Departure') == "" || getValues('Arrival') == "")
      return -1;
    if(getValues('heureArrivee') == "")
      return -2;
    // Calcul trajet : temps et distance
      let res = await trajet(getValues('Departure'), getValues('Arrival'), transport);
      setDistanceTrajet(res.distance);
      let tempsTrajetAffichage:string
      if(res.time < 60)
        tempsTrajetAffichage = res.time;
      else
        tempsTrajetAffichage = Math.floor(res.time/60) + "h " + res.time%60;
      setTempsTrajet(tempsTrajetAffichage);
    // Mise au propre des valeurs
    let debutTravailPROPRE: number;
        debutTravailPROPRE = parseInt(getValues('heureArrivee').split(":")[0])*60 + parseInt(getValues('heureArrivee').split(":")[1]);
    let tempsTrajetPROPRE: number;
        tempsTrajetPROPRE = parseInt(res.time);
    let tempsLeverPROPRE: number;
    if(getValues('DepartureTime') != "")
        tempsLeverPROPRE = parseInt(getValues('DepartureTime'));
    else
        tempsLeverPROPRE = 0;
    let tempsArriverPROPRE: number;
    if(getValues('ArrivalTime') != "")
        tempsArriverPROPRE = parseInt(getValues('ArrivalTime'));
    else
        tempsArriverPROPRE = 0;
    // Calcul heure de réveil
      let alarmeFinale = calculAlarme(debutTravailPROPRE, tempsTrajetPROPRE, tempsLeverPROPRE, tempsArriverPROPRE);
      let alarmeFinalePropre: string;
      let heures = Math.floor(alarmeFinale/60);
      let minutes = alarmeFinale%60;
      if(heures < 10) 
        alarmeFinalePropre = "0"+heures.toString();
      else 
        alarmeFinalePropre = heures.toString();
      if(minutes < 10)
        alarmeFinalePropre += ":0"+minutes.toString();
      else
        alarmeFinalePropre += ":"+minutes.toString();
      setAlarmeFinale(alarmeFinalePropre);
      return alarmeFinalePropre;
    }

    return (
      <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Card style={styles.cartes}>
        <Card.Title title="Heure de réveil estimé" titleStyle={styles.carteTitre} 
                    subtitle={alarmeFinale} subtitleStyle={{fontWeight:'bold', fontSize:20}}
            right={(props) => <Button 
                                mode='contained' 
                                style={{marginRight:15}} 
                                loading={enCours}
                                
                                onPress={async ()=> {
                                  onBlur();
                                  setEnCours(true);
                                  setTexte('');
                                  value = await calculAlarmeFinale();
                                  if(value == -1)
                                    setError('Il n\'y a pas d\'adresse de départ ou d\'arrivée');
                                  else if(value == -2)
                                    setError('Il n\'y a pas d\'heure d\'arrivée');
                                  setEnCours(false);
                                  setTexte('Calculer');
                                  onChange(value);
                                  }} >{texte}</Button>} />
          <Card.Content style={{marginEnd:30}}>
            {distanceTrajet!='' && tempsTrajet!='' && 
            <View>
              <Text>Distance du trajet : {distanceTrajet}km</Text>
              <Text>Temps du trajet : {tempsTrajet}min</Text>
              <Text children={undefined}></Text>
              </View>
            }        
            <Portal>
              <Dialog visible={error!=''} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title>Action impossible</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">{error}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button mode='contained' style={styles.boutonDialog} onPress={hideDialog}>Ok</Button>  
                </Dialog.Actions>
              </Dialog>
            </Portal>
            {errors.heureDepart && <Text style={styles.text}>Il n'y a pas d'heure de départ</Text>}
          </Card.Content>
      </Card>
      )}
      name="heureDepart"
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
      },
      boutonDialog:{
        width:100,
      }
});

export default HeureDepart;