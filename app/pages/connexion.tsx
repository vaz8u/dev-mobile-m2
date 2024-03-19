// page de connexion 
import React, { useContext, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Button, TextInput } from 'react-native-paper';
import { expo_go } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageContext } from '../../services/api/apolloClient';
import { useLogin } from '../../services/api/graphqlService';
import { ApolloError } from '@apollo/client';

export default function ConnexionScreen() {
  const setIsLogged = useContext(PageContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [login, { loading }] = useLogin();

  const handleLogin = () => {
    setErrorMessage('');

    login({ variables: { loginAccountInput: {
        username: email,
        password: password
    }}}).then(res => {
        const token:string = res.data.login.access_token;
        AsyncStorage.setItem("userId", res.data.login.account._id);
        AsyncStorage.setItem("token", token, () => {
            setIsLogged(true);
        });
    }).catch((err: ApolloError) => {
        if (err.networkError?.message === 'Network request failed') {
            setErrorMessage('La connexion au serveur ne peut pas être effectuée. Veuillez réessayer plus tard.');
            return;
        }

        const qf = err.graphQLErrors[0] as any;
        if (qf.code === 'UNAUTHENTICATED') {
            setErrorMessage('Les identifiants ne sont pas valides');
        }
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

      {loading 
        ? <Button icon='refresh' mode="contained" loading={true} disabled={true}>Chargement ...</Button>
        : <Button icon="login" mode="contained" onPress={handleLogin} style={styles.button}>
            Se connecter
        </Button>
        }

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
        width: '90%',
        textAlign: 'center'
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