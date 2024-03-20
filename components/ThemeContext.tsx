import React, { createContext, useContext, useEffect, useState } from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { Theme, listeTheme } from '../styles/themeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export function getTheme(themeList: Theme[], themeName: string, isDarkMode: boolean){
  const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...themeList.find((theme: { name: string; }) => theme.name === themeName)?.light
    },
      dark: isDarkMode
  };
  const darkTheme = {
      ...DefaultTheme,
      colors: {
          ...DefaultTheme.colors,
          ...themeList.find((theme: { name: string; }) => theme.name === themeName)?.dark
      },
      dark: isDarkMode
  };

  const newTheme = isDarkMode? darkTheme: lightTheme;
  return newTheme;
}

export const fetchTheme = async () => {
  try {
      const selectedTheme = await AsyncStorage.getItem('selectedTheme');
      const isDarkMode = await AsyncStorage.getItem('isDarkMode');

      if (selectedTheme !== null && isDarkMode !== null) {
          return { selectedTheme, isDarkMode: JSON.parse(isDarkMode) };
      } else {
          return { selectedTheme: null, isDarkMode: false };
      }
  } catch (error) {
      console.error('Erreur lors de la récupération du thème:', error);
      return { selectedTheme: null, isDarkMode: false };
  }
};


export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(DefaultTheme);
  const [themeList, setThemeList] = useState<Theme[]>(listeTheme);

  useEffect(() => {
      const fetchData = async () => {
        const { selectedTheme, isDarkMode } = await fetchTheme();
        if(selectedTheme !== null && isDarkMode !== null){
          let theme = getTheme(themeList, selectedTheme, isDarkMode);
          updateTheme(theme);
        }
      };
      fetchData();  
  }, []);

  const updateTheme = (newTheme: any) => {

    setCurrentTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, updateTheme }}>
        <PaperProvider theme={currentTheme} >
            {children}
        </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
