import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { List, Switch } from 'react-native-paper';

interface ParamProps {
    paramTitle:string;
}
const ToggleParameter = ({paramTitle}:ParamProps) => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isParameterOn, setIsParameterOn] = React.useState(false);
  const description = isParameterOn ? 'Activé' : 'Désactivé';

  const onToggleAlarmSound = () => {
    setIsParameterOn(!isParameterOn);
  };
  return (
    <View>
      <List.Item
        title={paramTitle}
        description={description}
        right={() => ( <Switch value={isParameterOn} onValueChange={onToggleAlarmSound} />)}
        onPress={() => {}}/>
    </View>
  );
};

export default ToggleParameter;
