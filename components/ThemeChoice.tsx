import { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from '../components/Themed';

import { DefaultTheme, useTheme, RadioButton, Text, Switch, Icon } from 'react-native-paper';
import { fetchTheme, useThemeContext } from './ThemeContext';
import { Theme, listeTheme } from '../styles/themeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeChoice = () => {
    const theme = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [checked, setChecked] = useState("Orchidée");
    const { currentTheme, updateTheme } = useThemeContext();

    const [themeList, setThemeList] = useState<Theme[]>(listeTheme);

    const setTheme = async (themeName: string, isDarkMode: boolean) => {
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
      try {
        updateTheme(newTheme);
        await AsyncStorage.setItem('selectedTheme', themeName);
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      } catch (error) {
          console.error('Erreur lors de la sauvegarde du thème:', error);
      }
    };

    useEffect(() => {
      fetchTheme().then(({ selectedTheme, isDarkMode }) => {
        if(selectedTheme !== null && isDarkMode !== null){
          setChecked(selectedTheme);
          setIsDarkMode(isDarkMode);
        }
      });
    }, []);

    const itemThemeChoice = ({ item, index }: { item: Theme, index: number }) => (
        <View style={styles.themeChoice}
              onTouchEnd={() => {
                setChecked(item.name);
                setTheme(item.name, isDarkMode);
              }}>
            <RadioButton 
                value={item.name}
                status={ checked === item.name ? 'checked' : 'unchecked' }
            />
            <Text style={[styles.text]}>{item.name}</Text>
            <View style={styles.colors}>
                <View style={[styles.view1, { backgroundColor: !theme.dark? item.light['primary'] : item.dark['primary'] }]}>
                    <Text> </Text>
                </View>
                <View style={[styles.view2, { backgroundColor: !theme.dark? item.light['secondary'] : item.dark['secondary'] }]}>
                    <Text> </Text>
                </View>
                <View style={[styles.view3, { backgroundColor: !theme.dark? item.light['tertiary'] : item.dark['tertiary'] }]}>
                    <Text> </Text>
                </View>
            </View>
        </View>
      );
    

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={[{marginHorizontal: 10}]}>Dark Mode</Text>
                <Icon source="white-balance-sunny" color={theme.dark? 'gray':'darkorange'} size={30}></Icon>
                <Switch
                    value={isDarkMode}
                    onValueChange={(newIdm) => {setIsDarkMode(newIdm); setTheme(checked, newIdm)}}
                />
                <Icon source="moon-waxing-crescent" color={theme.dark? 'yellow':'gray'} size={30}></Icon>
            </View>
          
            <FlatList
                removeClippedSubviews={false}
                scrollEnabled={false}
                data={themeList}
                renderItem={itemThemeChoice} 
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  themeChoice:{
    flexDirection: 'row',
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  text:{
    flex:1,
  },
  colors:{
    flex: 4,
    flexDirection: "row",
  },
  view1: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
  view2: {
    flex: 0.4,
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
  view3: {
    flex: 0.1,
    margin: 5,
    padding: 10,
    borderRadius: 5
  }
});

export default ThemeChoice;

