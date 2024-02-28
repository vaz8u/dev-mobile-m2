import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { DefaultTheme, useTheme, RadioButton, Text } from 'react-native-paper';
import { useThemeContext } from './ThemeContext';

interface ThemeVariables {
    '--text': string,
    '--background': string,
    '--primary': string,
    '--secondary': string,
    '--accent': string,
  }
  
  interface Theme {
    'name': string,
    'light': ThemeVariables,
    'dark': ThemeVariables,
  }

const ThemeChoice = () => {
    const theme = useTheme();
    const [checked, setChecked] = useState('Theme 1');
    const { currentTheme, updateTheme } = useThemeContext();


    const [themeList, setThemeList] = useState<Theme[]>([
        {
          name: 'Theme 1',
          light: {
            '--text': '#050315',
            '--background': '#fbfbfe',
            '--primary': '#2f27ce',
            '--secondary': '#dedcff',
            '--accent': '#433bff',
          },
          dark: {
            '--text': '#ebe9fc',
            '--background': '#010104',
            '--primary': '#3a31d8',
            '--secondary': '#020024',
            '--accent': '#0600c2',
          },
        },
        {
          name: 'Theme 2',
          light: {
            '--text': '#100c0c',
            '--background': '#f7f4f4',
            '--primary': '#9d7a78',
            '--secondary': '#c2bcab',
            '--accent': '#aaa68a',
          },
          dark: {
            '--text': '#f4f0f0',
            '--background': '#0c0909',
            '--primary': '#886463',
            '--secondary': '#534d3c',
            '--accent': '#767356',
          },
        }
    ]);

    const setTheme = (themeName: string) => {
        const newTheme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                text: themeList.find((theme: { name: string; }) => theme.name === themeName)?.light['--text'],
                background: themeList.find((theme: { name: string; }) => theme.name === themeName)?.light['--background'] || DefaultTheme.colors.background,
                primary: themeList.find((theme: { name: string; }) => theme.name === themeName)?.light['--primary'] || DefaultTheme.colors.primary,
                secondary: themeList.find((theme: { name: string; }) => theme.name === themeName)?.light['--secondary'] || DefaultTheme.colors.secondary,
                accent: themeList.find((theme: { name: string; }) => theme.name === themeName)?.light['--accent'],
            },
        };
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
            <Text style={[styles.text, { color: !theme.dark? item.light['--text'] : item.dark['--text'] }]}>{item.name}</Text>
            <View style={styles.colors}>
                <View style={[styles.view1, { backgroundColor: !theme.dark? item.light['--primary'] : item.dark['--primary'] }]}>
                    <Text> </Text>
                </View>
                <View style={[styles.view2, { backgroundColor: !theme.dark? item.light['--secondary'] : item.dark['--secondary'] }]}>
                    <Text> </Text>
                </View>
            </View>
        </View>
      );

    

    return (
        <View style={styles.container}>
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

