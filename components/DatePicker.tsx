import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { getWeekday, getWeekdayAbbreviation } from '../services/DateParserService';
import 'moment/locale/fr';
import { Card, Switch } from 'react-native-paper';


export const DatePicker = ({ selectedDate, onDateChange }: { selectedDate: Date, onDateChange: (date: Date) => void }) => {
  const [date, setDate] = useState(new Date()); // Initialize state with current date
  const [dateString, setDateString] = useState(moment(date).format('YYYY-MM-DD')); // Format the date string
  const [showPicker, setShowPicker] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleDateChange = (event: any, date: Date | undefined) => {
    setShowPicker(false);
    if (date) {
      onDateChange(date);
    }
  };

  const formatDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  return (
    <Card style={styles.cartes}>
      <Card.Title titleStyle={styles.carteTitre} title="Date" 
                  subtitle="Date unique d'activation"
        right={() => 
          <View style={styles.view}>
            <DateTimePicker
              value={selectedDate}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
              style={{width: 100,marginRight:5}}
              disabled={!isSwitchOn}
            />
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>}/>
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
  },
  view:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:10
  }
});
