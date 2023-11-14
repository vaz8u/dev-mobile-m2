import React from 'react';
import { View, Button as RNButton, Text } from 'react-native';
import DesignInterface from './DesignInterface';

// Implémentation spécifique à Material Design
class MaterialDesign implements DesignInterface {

  renderButton(onPress: () => void, label: string): React.ReactNode {
    return <RNButton onPress={onPress} title={label} />;
  }

  renderCard(title: string, content: string): React.ReactNode {
    return (
      <View style={{ /* Styles spécifiques à Material Design */ }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        <Text>{content}</Text>
      </View>
    );
  }
}

export default MaterialDesign;
