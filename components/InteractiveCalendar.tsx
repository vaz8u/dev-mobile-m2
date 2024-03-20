import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View as ViewRN, ScrollView } from 'react-native';
import { View } from '../components/Themed';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useGetAlarms } from '../services/api/graphqlService';
import { parseAlarmDate, parseAlarmTime } from '../services/DateParserService';
import { Calendrier, Evenement } from '../models/Evenement';

interface Alarm {
  time: string;
  description: string;
}

interface Alarms {
  [date: string]: Alarm[];
}

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';


const InteractiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [alarms, setAlarms] = useState<Alarms>({});
  const theme = useTheme();
  const [themeKey, setThemeKey] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [calendriersSelected, setCalendriersSelected] = useState<boolean[]>([]);

  const isSwitchOnCalendar = (calendrier: string) => {
    return calendriersSelected[Object.keys(calendriers).indexOf(calendrier)];
  };

  const onToggleSwitchCalender = (calendrier: string) => () => {
    // si le calendrier vient de s'activer, on ajoute les jours des evenements au markedDates
    if (!isSwitchOnCalendar(calendrier)) {
      const events = calendriers[calendrier].evenements;
      const marked: Record<string, { selected: boolean; marked: boolean, selectedColor:string }> = {...markedDates};
      events.forEach((event) => {
        const date = event.startDate.toISOString().split('T')[0];
        marked[date] = { selected: true, marked: true, selectedColor: calendriers[calendrier].couleur};
      });
      setMarkedDates(marked);

    }
    // sinon on retire les jours des evenements du markedDates
    else {
      const events = calendriers[calendrier].evenements;
      const marked: Record<string, { selected: boolean; marked: boolean }> = {...markedDates};
      events.forEach((event) => {
        const date = event.startDate.toISOString().split('T')[0];
        delete marked[date];
      });
      setMarkedDates(marked);
    }
    const newCalendriersSelected = [...calendriersSelected];
    newCalendriersSelected[Object.keys(calendriers).indexOf(calendrier)] = !isSwitchOnCalendar(calendrier);
    setCalendriersSelected(newCalendriersSelected);
    

  };

  /* TODO Récupère les calendriers depuis le serveur
  const { data: calendriersFetch, refetch } = useGetCalendriers();
  useEffect(() => {
    const fetchCalendriers = () => {
      refetch().then((calendriersData) => {
        const fetchedCalendriers = calendriersData?.data?.calendriers || [];
        const newCalendriersSelected = fetchedCalendriers.map(() => false);
        setCalendriersSelected(newCalendriersSelected);
      }).catch((error) => {
        console.error('Error fetching calendriers:', error);
      });
    };
    fetchCalendriers();
  }, [calendriersFetch]);*/


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
      setMarkedDates(Object.keys(alarms).reduce((marked, date) => {
        marked[date] = { selected: true, marked: true };
        return marked;
      }, {} as Record<string, { selected:boolean; marked: boolean }>));
      }).catch((error) => {
        console.error('Error fetching alarms:', error);
      });
    };
    fetchAlarms();
    
  }, [data]);

  const sortedAlarms = selectedDate?[...(alarms[selectedDate] || [])].sort((a, b) => {
    const timeA = parseInt(a.time.replace(':', ''), 10);
    const timeB = parseInt(b.time.replace(':', ''), 10);
    return timeA - timeB;
  }) : [];

  useEffect(() => {
    // Mettez à jour la clé du thème pour forcer le rendu du calendrier lorsqu'il y a un changement de thème
    setThemeKey((prevKey: number) => prevKey + 1);
  }, [theme]);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setMarkedDates({ [day.dateString]: { selected: true, marked: true, selectedDotColor: 'orange' } });
  };

  // prends selectedDate et le formate pour l'afficher
  const renderDate = (date:string) => {
    return date.split('-').reverse().join('/');
  }


  const renderAlarms = () => {
    if(!selectedDate) {
      return;
    }
    if (!(selectedDate in alarms)) {
      return <Text style={styles.alarmText}>Pas d'alarme active le {renderDate(selectedDate)}</Text>;
    }
    return (
      <View>
        <Text style={styles.alarmText}>Alarmes du {renderDate(selectedDate)}</Text>
        <FlatList
          data={sortedAlarms}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.alarmContainer}>
              <Text style={styles.alarmDescription}>{item.description}</Text>
              <Text style={styles.alarmTime}>À {item.time.replace(':', 'h')}</Text>
            </View>
          )}
        />
       </View>
    );
  };

  // TODO Récupérer les calendriers depuis le serveur
  const calendriers: {[key: string]: Calendrier} = {
    "Calendrier 1": new Calendrier(
      [
        new Evenement(
          "Evenement 1",
          new Date("2024-03-30T00:00:00"),
          new Date("2024-03-30T23:59:59"),
          "Lieu 1",
          "Description 1",
          "Calendrier 1"
        ),
        new Evenement(
          "Evenement 2",
          new Date("2024-03-30T00:00:00"),
          new Date("2024-03-30T23:59:59"),
          "Lieu 2",
          "Description 2",
          "Calendrier 1"
        )
      ],
      "Calendrier 1",
      "red"
    ),
    "Calendrier 2": new Calendrier(
      [
        new Evenement(
          "Evenement 3",
          new Date("2024-03-29T00:00:00"),
          new Date("2024-03-29T23:59:59"),
          "Lieu 3",
          "Description 3",
          "Calendrier 2"
        ),
        new Evenement(
          "Evenement 4",
          new Date("2024-03-30T00:00:00"),
          new Date("2024-03-30T23:59:59"),
          "Lieu 4",
          "Description 4",
          "Calendrier 2"
        )
      ],
      "Calendrier 2",
      "blue"
    )
  };

  const renderCalendriers = () => {
    return(
    <View>
      <List.Accordion title="Calendriers Importés" left={(props) => <List.Icon {...props} icon="calendar-import" />}>
       {Object.keys(calendriers).map((calendrier) => {
        return (
          <List.Item
            key={calendrier}
            title={calendrier}
            left={(props) => <List.Icon {...props} icon="calendar-today" color={calendriers[calendrier].couleur} />}
            right={(props) => <Switch value={isSwitchOnCalendar(calendrier)} onValueChange={onToggleSwitchCalender(calendrier)} />}
          />
        );
      }
      )}
      </List.Accordion>
    </View>);
  };
  
  return (
    <ScrollView>
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
          {renderCalendriers()}
        <View style={styles.renderAlarms}>
          {renderAlarms()}
        </View>
      </ViewRN>
    </ScrollView>
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
  alarmText: {
    fontSize: 18,
    textAlign: 'center',
  },
  alarmContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
    marginLeft: 15
  },
  alarmTime: {
    fontSize: 14,
  },
  alarmDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text:{
      color:'white',
      backgroundColor:'red'
  }
});
