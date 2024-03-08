import React from 'react';
import { View } from '../components/Themed';

import { List, Switch } from 'react-native-paper';

interface ParamProps {
  paramTitle: string;
  isParamActivated: boolean;
  onToggle: (paramTitle: string) => void; // Callback function for toggling the parameter
}

const ToggleParameter = ({ paramTitle, isParamActivated, onToggle }: ParamProps) => {
  const description = isParamActivated ? 'Activé' : 'Désactivé';

  return (
    <View>
      <List.Item
        title={paramTitle}
        description={description}
        right={() => <Switch value={isParamActivated} onValueChange={() => onToggle(paramTitle)} />}
        onPress={() => {}}
      />
    </View>
  );
};

export default ToggleParameter;
