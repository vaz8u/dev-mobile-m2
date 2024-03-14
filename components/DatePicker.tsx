import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { getWeekday, getWeekdayAbbreviation } from '../services/DateParserService';
import 'moment/locale/fr';


export const DatePicker = ({ selectedDate, onDateChange }: { selectedDate: Date, onDateChange: (date: Date) => void }) => {
  const [date, setDate] = useState(new Date()); // Initialize state with current date
  const [dateString, setDateString] = useState(moment(date).format('YYYY-MM-DD')); // Format the date string
  const [showPicker, setShowPicker] = useState(false);

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
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={togglePicker}>
        <Text>Date: {getWeekday(selectedDate)} {formatDate(selectedDate)}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          style={{ backgroundColor: 'white' }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom:5
  },
});
