import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { List, Switch, TextInput, Button } from 'react-native-paper';

interface InputLocationProps {
    label:string;
    placeholder:string;
}
const InputLocation = ({label, placeholder}:InputLocationProps) => {
    const [inputValue, setInputValue] = React.useState("");
  
  return (
    <View style={styles.inputContainer}>
        <TextInput label={label} value={inputValue} mode="outlined" style={styles.textField}
        placeholder={placeholder} right={<TextInput.Icon icon="close" />}
        onChangeText={arrival => setInputValue(inputValue)} />
        <Button mode="contained" disabled={false} icon="map-marker">
        </Button>
    </View>
  );
};

export default InputLocation;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor:'white',
        padding:10
      },
    row: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textField: {
        flex: 1, // Allow TextInput to take up remaining space
        marginRight: 8, // Add some space between TextInput and Button
        marginTop: 8,
      }
});
