import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import * as tempsTrajet from '../../services/trajet';

export default function TabOneScreen() {

  const [trajet, setTrajet] = useState<string>();
  let adresse = { nrue: '', rue: '', ville: 'Nancy' };
  let adresse2 = { nrue: '', rue: '', ville: 'Metz' };

  useEffect(() => {
    async function fetchCoords() {
      const result3 = await tempsTrajet.trajet(adresse, adresse2);
      setTrajet(`${result3.distance} km - ${result3.time} min`);
    }
    fetchCoords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Text>{trajet}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
