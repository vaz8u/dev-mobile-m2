import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View as ViewRN } from 'react-native';
import { View } from '../components/Themed';
import { Text, useTheme } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { useGetAlarms } from '../services/api/graphqlService';
import { parseAlarmDate, parseAlarmTime } from '../services/DateParserService';
interface Alarm {
  time: string;
  description: string;
}

interface Alarms {
  [date: string]: Alarm[];
}

const InteractiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [alarms, setAlarms] = useState<Alarms>({});
  const theme = useTheme();
  const [themeKey, setThemeKey] = useState(0);


  const { data, refetch } = useGetAlarms();
  useEffect(() => {
    const fetchAlarms = () => {
      refetch().then((alarmsData) => {
        const fetchedAlarms = alarmsData?.data?.alarms || [];
        const updatedList = fetchedAlarms.reduce((acc: { [x: string]: { time: string; description: any }[]; }, alarm: { triggeredDate: string; name: string; activated:boolean;}) => {
          if(!alarm.activated) return acc;
          const parsedDate = parseAlarmDate(alarm.triggeredDate);
                
          if (acc[parsedDate]) {
            acc[parsedDate].push({ time: parseAlarmTime(alarm.triggeredDate), description: alarm.name });
          } else {
            acc[parsedDate] = [{ time: parseAlarmTime(alarm.triggeredDate), description: alarm.name }];
          }
                  
          return acc;
      }, {} as Alarms);
      setAlarms(updatedList);
      }).catch((error) => {
        console.error('Error fetching alarms:', error);
      });
    };
    fetchAlarms();
    
  }, [data]);

  useEffect(() => {
    // Mettez à jour la clé du thème pour forcer le rendu du calendrier lorsqu'il y a un changement de thème
    setThemeKey((prevKey: number) => prevKey + 1);
  }, [theme]);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const renderAlarms = () => {
    if(!selectedDate) {
      return;
    }
    if (!(selectedDate in alarms)) {
      return <Text style={styles.noAlarmText}>Pas d'alarme active le {selectedDate}</Text>;
    }
    return (
      <FlatList
        data={alarms[selectedDate]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.alarmContainer}>
            <Text style={styles.alarmTime}>{item.time}</Text>
            <Text style={styles.alarmDescription}>{item.description}</Text>
          </View>
        )}
      />
    );
  };
  const markedDates = Object.keys(alarms).reduce((marked, date) => {
    marked[date] = { selected: true, marked: true };
    return marked;
  }, {} as Record<string, { selected:boolean; marked: boolean }>);
  
  return (
    <View >
      <ViewRN >
        <Calendar key={themeKey} onDayPress={handleDayPress} markedDates={markedDates}
          theme={{
            calendarBackground: theme.colors.surfaceVariant,
            todayTextColor: theme.colors.primary,
            dayTextColor: theme.colors.onBackground,
            arrowColor: theme.colors.primary,
            monthTextColor: theme.colors.onBackground
          }}
        />
        <View style={styles.renderAlarms}>
          {renderAlarms()}
        </View>
      </ViewRN>
    </View>
  );
};

export default InteractiveCalendar;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderAlarms:{
    height: "100%"
  },
  noAlarmText: {
    fontSize: 18,
    textAlign: 'center',
  },
  alarmContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  alarmTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  alarmDescription: {
    fontSize: 14,
    color:'white'
  },
  text:{
      color:'white',
      backgroundColor:'red'
  }
});
