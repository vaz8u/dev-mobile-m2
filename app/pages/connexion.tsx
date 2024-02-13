// page de connexion 
import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { expo_go } from '@env';

export default function ConnexionScreen() {
  let navigation = useRouter();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleLogin = () => {
    console.log(email, password);
    navigation.push('/pages/alarmList');
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />
      <Button icon="login" mode="contained" onPress={handleLogin} style={styles.button}>
        Se connecter
      </Button>

      {setGoogleButton()}

      <TouchableOpacity //TODO onPress={() => navigation.push('/(tabs)/inscription')}>
      >
        <Text style={styles.text}>Pas encore de compte ?</Text>
      </TouchableOpacity>
    </View>
  );
}

// Affiche ou non le bouton de connexion Google
const setGoogleButton = () => {
  if(expo_go){ // si on est en dev sans expo go
    let GoogleHButton = require('../../components/GoogleHandler');
    return(
      <GoogleHButton.GoogleHButton></GoogleHButton.GoogleHButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 50,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888',
  },
});