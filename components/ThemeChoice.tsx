import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { DefaultTheme, useTheme, RadioButton, Text, Switch } from 'react-native-paper';
import { useThemeContext } from './ThemeContext';
import { Theme, listeTheme } from '../styles/themeStyle';



const ThemeChoice = () => {
    const theme = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [checked, setChecked] = useState('Theme 1');
    const { currentTheme, updateTheme } = useThemeContext();

    const [themeList, setThemeList] = useState<Theme[]>(listeTheme);

    const setTheme = (themeName: string) => {
        const lightTheme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                ...themeList.find((theme: { name: string; }) => theme.name === themeName)?.light
            },
            dark: theme.dark
        };
        const darkTheme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                ...themeList.find((theme: { name: string; }) => theme.name === themeName)?.dark
            },
            dark: theme.dark
        };
        
        const newTheme = theme.dark? darkTheme: lightTheme;

        updateTheme(newTheme);
    };



    const itemThemeChoice = ({ item, index }: { item: Theme, index: number }) => (
        <View style={styles.themeChoice}>
            <RadioButton 
                value={item.name}
                status={ checked === item.name ? 'checked' : 'unchecked' }
                onPress={() => {
                    setChecked(item.name);
                    setTheme(item.name);
                }}
            />
            <Text style={[styles.text]}>{item.name}</Text>
            <View style={styles.colors}>
                <View style={[styles.view1, { backgroundColor: !theme.dark? item.light['primary'] : item.dark['primary'] }]}>
                    <Text> </Text>
                </View>
                <View style={[styles.view2, { backgroundColor: !theme.dark? item.light['secondary'] : item.dark['secondary'] }]}>
                    <Text> </Text>
                </View>
            </View>
        </View>
      );

    

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={() => {setIsDarkMode(!isDarkMode); theme.dark = !isDarkMode;}}
                />
            </View>
            <FlatList
                data={themeList}
                renderItem={itemThemeChoice} 
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
    },
  themeChoice:{
    flexDirection: 'row',
    alignItems: "center",
    margin: 20
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
    padding: 10
  },
  view2: {
    flex: 0.6,
    margin: 5,
    padding: 10
  },
  view3: {
    flex: 0.3,
    margin: 5,
    padding: 10
  },
});

export default ThemeChoice;

