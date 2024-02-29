// page de connexion 
import React, { useContext, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Button, TextInput } from 'react-native-paper';
import { GRAPHQL_URI, expo_go } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageContext } from '../../services/api/apolloClient';
import { useLogin } from '../../services/api/graphqlService';

export default function ConnexionScreen() {
    const setIsLogged = useContext(PageContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [login] = useLogin();

  const fetchTokenDynamically = async (username:string, password:string) => {
    // TODO use useLogin()
    const response = await fetch(GRAPHQL_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation {
            login(loginAccountInput: {
              username: "${username}"
              password: "${password}"
            }) {
              access_token
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const data = await response.json();

    if (data.errors && data.errors.length !== 0) {
        throw new Error(data.errors[0].message);
    }

    const token:string = data.data.login.access_token;

    await AsyncStorage.setItem("token", token);

    if (!token) {
        throw new Error("Token not found in the response");
    }
  };


  const handleLogin = () => {
    fetchTokenDynamically(email, password).then(res => {
        setIsLogged(true);
    }).catch(err => {
        setErrorMessage(err.message)
    });
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />
      <Text 
        style={styles.errorMessage}>
            { errorMessage }
      </Text>
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
    errorMessage: {
        color: 'red',
    },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    marginBottom: 20
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