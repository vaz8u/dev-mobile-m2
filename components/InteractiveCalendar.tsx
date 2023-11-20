import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Alarm {
  time: string;
  description: string;
}

interface Alarms {
  [date: string]: Alarm[];
}

const InteractiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [alarms, setAlarms] = useState<Alarms>({
    '2023-11-15': [{ time: '08:00 AM', description: 'Meeting' }],
    '2023-11-20': [{ time: '12:30 PM', description: 'Lunch' }],
  });

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const renderAlarms = () => {
    if (!selectedDate || !(selectedDate in alarms)) {
      return <Text style={styles.text}>Pas d'alarme active le {selectedDate}</Text>;
    }

    return alarms[selectedDate].map((alarm, index) => (
      <View key={index}>
        <Text style={styles.text}>{alarm.time}</Text>
        <Text style={styles.text}>{alarm.description}</Text>
      </View>
    ));
  };

  const markedDates = Object.keys(alarms).reduce((marked, date) => {
    marked[date] = { selected: true, marked: true };
    return marked;
  }, {} as Record<string, { selected:boolean; marked: boolean }>);
  
  return (
    <View>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates}/>
      {renderAlarms()}
    </View>
  );
};

export default InteractiveCalendar;
const styles = StyleSheet.create({
    text:{
        color:'white',
        backgroundColor:'red'
    }
  });
