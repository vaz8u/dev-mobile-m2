import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, SegmentedButtons } from 'react-native-paper';

const MethodeTransport = ({transport, setTransport}) => {
    return (
        <Card style={styles.cartes}>
          <Card.Title title="Méthode de Transport" titleStyle={styles.carteTitre} />
            <Card.Content>
                <SafeAreaView>
                    <SegmentedButtons
                        value={transport}
                        onValueChange={setTransport}
                        buttons={[
                        {
                            value: 'walk',
                            label: 'Marche',
                            icon: 'walk',
                        },
                        {
                            value: 'transit',
                            label: 'Bus',
                            icon: 'bus',
                        },
                        { value: 'drive', 
                            label: 'Voiture',
                            icon: 'car',
                        },
                        ]}
                    />
                </SafeAreaView>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    cartes:{
        marginTop:5,
      },
    carteTitre:{
        fontSize:18,
        fontWeight:'bold'
    }
});

export default MethodeTransport;