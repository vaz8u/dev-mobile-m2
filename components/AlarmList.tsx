import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { List, Switch } from 'react-native-paper';


export default function AlarmList() {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [isPressing, setIsPressing] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const handlePressIn = () => {
        setIsPressing(true);
    
        // Définir le délai après lequel la fonction sera appelée (en millisecondes)
        const delay = 2000; // 2 secondes
    
        // Utiliser setTimeout pour appeler la fonction après le délai
        setTimeout(() => {
          if (isPressing) {
            // Appeler votre fonction ici
            console.log('Fonction appelée après 2 secondes de pression');
          }
        }, delay);
      };
    
      const handlePressOut = () => {
        setIsPressing(false);
      };

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <List.Item 
                style={styles.item}
                title="List Item"
                description="08:00"
                left={props => <List.Icon icon="size-l" />}
                right={props => <Switch style={styles.switch} value={isSwitchOn} onValueChange={onToggleSwitch}/>}
            />
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    item:{
        width:'100%',
        padding: 10,
        
    },
    icon:{
        width: 40,
        height: 40,
        backgroundColor: "red",
        borderRadius: 50,
        alignSelf:'center',
        textAlign:'center',
        textAlignVertical:'center'
        
    },
    switch:{

    }
});
