import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';


const ClassicAlarmForm = () => {
  return (
    <View style={[styles.scene]}>
    <Text>Classic Creation Form</Text>
    {/* Add your advanced creation form components here */}
  </View>
  );
};

export default ClassicAlarmForm;
const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor:'white'
      }
});