import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View as ViewRN, ScrollView } from "react-native";
import { View } from "../components/Themed";
import { Text, useTheme } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { useGetAlarmsByUserId } from "../services/api/graphqlService";
import { parseAlarmDate, parseAlarmTime } from "../services/DateParserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Alarm {
  time: string;
  description: string;
}

interface Alarms {
  [date: string]: Alarm[];
}

const InteractiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [alarms, setAlarms] = useState<Alarms>({});
  const theme = useTheme();
  const [themeKey, setThemeKey] = useState(0);
  const [userId, setUserId] = useState("");

  const { data, refetch } = useGetAlarmsByUserId(userId);
  useEffect(() => {
    AsyncStorage.getItem("userId").then((value) => {
      setUserId(value ?? "");
    });

    const fetchAlarms = () => {
      refetch()
        .then((alarmsData) => {
          const fetchedAlarms = alarmsData?.data?.alarms || [];
          const updatedList = fetchedAlarms.reduce(
            (
              acc: { [x: string]: { time: string; description: any }[] },
              alarm: { triggeredDate: string; name: string; activated: boolean }
            ) => {
              if (!alarm.activated) return acc;
              const parsedDate = parseAlarmDate(alarm.triggeredDate);

              if (acc[parsedDate]) {
                acc[parsedDate].push({
                  time: parseAlarmTime(alarm.triggeredDate),
                  description: alarm.name,
                });
              } else {
                acc[parsedDate] = [
                  {
                    time: parseAlarmTime(alarm.triggeredDate),
                    description: alarm.name,
                  },
                ];
              }

              return acc;
            },
            {} as Alarms
          );
          setAlarms(updatedList);
        })
        .catch((error) => {
          console.error("Error fetching alarms:", error);
        });
    };
    fetchAlarms();
  }, [data]);

  const sortedAlarms = selectedDate
    ? [...(alarms[selectedDate] || [])].sort((a, b) => {
        const timeA = parseInt(a.time.replace(":", ""), 10);
        const timeB = parseInt(b.time.replace(":", ""), 10);
        return timeA - timeB;
      })
    : [];

  useEffect(() => {
    // Mettez à jour la clé du thème pour forcer le rendu du calendrier lorsqu'il y a un changement de thème
    setThemeKey((prevKey: number) => prevKey + 1);
  }, [theme]);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const renderAlarms = () => {
    if (!selectedDate) {
      return;
    }
    if (!(selectedDate in alarms)) {
      return (
        <Text style={styles.noAlarmText}>
          Pas d'alarme active le {selectedDate}
        </Text>
      );
    }
    return (
      <View>
        <Text style={styles.alarmText}>Alarmes du {selectedDate}</Text>
        <FlatList
          data={sortedAlarms}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.alarmContainer}>
              <Text style={styles.alarmDescription}>{item.description}</Text>
              <Text style={styles.alarmTime}>
                À {item.time.replace(":", "h")}
              </Text>
            </View>
          )}
        />
      </View>
    );
  };
  const markedDates = Object.keys(alarms).reduce((marked, date) => {
    marked[date] = { selected: true, marked: true };
    return marked;
  }, {} as Record<string, { selected: boolean; marked: boolean }>);

  return (
    <ScrollView>
      <ViewRN>
        <Calendar
          key={themeKey}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            calendarBackground: theme.colors.surfaceVariant,
            todayTextColor: theme.colors.primary,
            dayTextColor: theme.colors.onBackground,
            arrowColor: theme.colors.primary,
            monthTextColor: theme.colors.onBackground,
          }}
        />
        <View style={styles.renderAlarms}>{renderAlarms()}</View>
      </ViewRN>
    </ScrollView>
  );
};

export default InteractiveCalendar;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  renderAlarms: {
    height: "100%",
  },
  alarmText: {
    fontSize: 18,
    textAlign: "center",
  },
  alarmContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 10,
    marginLeft: 15,
  },
  alarmTime: {
    fontSize: 14,
  },
  alarmDescription: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "white",
    backgroundColor: "red",
  },
});
