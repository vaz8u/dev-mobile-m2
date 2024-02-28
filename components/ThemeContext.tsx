import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(DefaultTheme);

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
