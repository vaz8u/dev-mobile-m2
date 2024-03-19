import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, TextInput } from 'react-native-paper';

const TempsSupplementaire = (
    { tempsLever, setTempsLever, tempsArriver, setTempsArriver }
) => {
    return (
        <Card style={styles.cartes}>
        <Card.Title title="Temps supplémentaire" titleStyle={styles.carteTitre} />
        <Card.Content>
      <View style={styles.tempsContainer}>
        <TextInput
          label="Pour se lever"
          value={tempsLever}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
          maxLength={2}
          onChange={event => setTempsLever(event.nativeEvent.text)}
        />
        <TextInput
          label="Pour arriver"
          value={tempsArriver}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
          maxLength={2}
          onChange={event => setTempsArriver(event.nativeEvent.text)}
        />
      </View>
      </Card.Content>
      </Card>
    );
};

const styles = StyleSheet.create({
    tempsContainer: {
        flexDirection: 'row', // Aligner les éléments horizontalement
        justifyContent: 'space-between', // Répartir l'espace entre les éléments
        backgroundColor: 'transparent',
      },
      input: {
        flex: 1, // Partager l'espace de manière égale
        marginRight: 8, // Espacement entre les éléments
      },
      cartes:{
        marginTop:5,
      },
      carteTitre:{
        fontSize:18,
        fontWeight:'bold'
      }
});

export default TempsSupplementaire;