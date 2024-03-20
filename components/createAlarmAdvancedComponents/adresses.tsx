import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import InputLocation from '../InputLocation';

const Adresses = ( 
   { control, errors }
) => {
    return (
        <Card style={styles.cartes}>
        <Card.Title title="Adresses" titleStyle={styles.carteTitre} />
        <Card.Content>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputLocation
                label="Départ"
                value={value}
                placeholder="Adresse de départ"
                onBlur={onBlur}
                onChange={onChange}
                setValue={onChange}
              />
            )}
            name="Departure"
          />        
          {errors.Departure && <Text style={styles.text}>Il manque l'adresse de départ</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputLocation
                label="Arrivée"
                value={value}
                placeholder="Adressse d'arrivée"
                onBlur={onBlur}
                onChange={onChange}
                setValue={onChange}
              />
            )}
            name="Arrival"
          />
        {errors.Arrival && <Text style={styles.text}>Il manque l'adresse d'arrivée</Text>}
        </Card.Content>
      </Card>
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
});

export default Adresses;