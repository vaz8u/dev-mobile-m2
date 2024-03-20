import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';

/* Ouvre la fenêtre de connexion Google
 * Recoit les infos de l'utilisateur
 * Redirige vers la page d'accueil */
async function _signIn(){
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        // navigation
        let navigation = useRouter();
        navigation.push('/(tabs)/alarmList');
    } catch (error: any) {
        console.log(error.code, ' _signIn ',error)
    }
}

// Bouton de connexion Google
export function GoogleHButton(){
    return(
        <GoogleSigninButton
            style={{ alignSelf: 'center'}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_signIn}
        />
    );
}