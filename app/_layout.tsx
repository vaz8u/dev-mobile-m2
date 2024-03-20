import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import client, { PageContext } from '../services/api/apolloClient';
import ConnexionScreen from './pages/connexion';
import { ThemeProvider } from '../components/ThemeContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


function RootLayoutNav() {
    const [isLogged, setIsLogged] = useState(false);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <PageContext.Provider value={setIsLogged} >
            {
                isLogged
                    ? <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                    : <ConnexionScreen></ConnexionScreen>
            }
        </PageContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
