import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";
import AlarmList, { AlarmListInterface, Day } from "../components/AlarmList";
import { Button, Divider, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import {
  useDeleteAlarm,
  GET_ALARMS_BY_USER_ID,
} from "../services/api/graphqlService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getWeekdayAbbreviation } from "../services/DateParserService";

const AlarmListScreen = () => {
  const navigation = useRouter();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [alarmList, setAlarmList] = useState<AlarmListInterface[]>([]);
  const [userId, setUserId] = useState("");

  const [refetch, { data }] = useLazyQuery(GET_ALARMS_BY_USER_ID, {
    variables: { userId },
  });

  const [deleteAlarm] = useDeleteAlarm();

  useEffect(() => {
    const fetchAlarms = async () => {
      let tmp;
      if (userId === "") {
        tmp = (await AsyncStorage.getItem("userId")) ?? "";
        setUserId(tmp);
      } else {
        tmp = userId;
      }

      if (tmp === null) {
        setAlarmList([]);
        return;
      }

      refetch({
        variables: {
          userId: tmp,
        },
      })
        .then((value) => {
          const updatedList = value.data.alarmsByUserId.map((alarm: any) => ({
            _id: alarm._id,
            title: alarm.name,
            description: alarm.triggeredDate,
            enable: alarm.activated,
            selected: false,
            day: getWeekdayAbbreviation(alarm.triggeredDate),
          }));

          setAlarmList(updatedList);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchAlarms();
  }, [data]);

  const handlePressIn = (index: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const delay = 1000;

    const id = setTimeout(() => {
      setIsPressed(true);
      alarmList[index]["selected"] = true;
    }, delay);

    setTimeoutId(id);
  };

  const handlePressOut = (alarmTitle: string, alarmId: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    // If it's a long press, don't redirect
    if (isPressed) {
      return;
    }
    console.log(alarmTitle);
    navigation.push({
      pathname: "/(tabs)/viewAlarm",
      params: { alarmTitle, alarmId },
    });
  };

  const cancelSelection = () => {
    setIsPressed(false);
    const updatedList: AlarmListInterface[] = alarmList.map((alarm) => ({
      ...alarm,
      selected: false,
    }));

    setAlarmList(updatedList);
  };

  const deleteSelection = async () => {
    console.log("delete selection");
    try {
      setIsPressed(false);
      const selectedAlarms = alarmList.filter((alarm) => alarm.selected);

      const alarmIdsToDelete = selectedAlarms.map((alarm) => alarm._id);
      await Promise.all(
        alarmIdsToDelete.map(async (alarmId: string) => {
          await deleteAlarm({
            variables: {
              alarmId: alarmId,
            },
          }).catch((error) => {
            console.error(
              `Error deleting alarm ${alarmId}:`,
              error.networkError.result.errors
            );
          });
        })
      );
      setAlarmList((prevList) => prevList.filter((alarm) => !alarm.selected));
      await refetch();
    } catch (error) {
      console.error("Error deleting alarm:", error);
    }
  };

  const addAlarm = () => {
    const newAlarm: AlarmListInterface = {
      _id: "1",
      title: `Alarm ${alarmList.length + 1}`,
      description: "10:00",
      enable: true,
      selected: false,
      day: Day.Lundi,
    };

    setAlarmList((prevList) => [...prevList, newAlarm]);
  };

  const updateAlarmList = <K extends keyof AlarmListInterface>(
    index: number,
    key: K,
    newValue: AlarmListInterface[K]
  ) => {
    const updatedList: AlarmListInterface[] = [...alarmList];
    updatedList[index][key] = newValue;
    setAlarmList(updatedList);
  };

  const itemAlarm = ({
    item,
    index,
  }: {
    item: AlarmListInterface;
    index: number;
  }) => (
    <View>
      <TouchableOpacity
        onPressIn={() => handlePressIn(index)}
        onPressOut={() => handlePressOut(item.title, item._id)}
      >
        <AlarmList
          title={item.title}
          description={item.description}
          enable={item.enable}
          selected={item.selected}
          day={item.day}
          isSelected={isPressed}
          onUpdate={(key: keyof AlarmListInterface, newValue: any) =>
            updateAlarmList(index, key, newValue)
          }
          _id={item._id}
        />
      </TouchableOpacity>
      <Divider />
    </View>
  );

  return (
    <View style={styles.container}>
       {alarmList.length == 0 ? (
          <Text style={styles.alarmeVide}>Liste d'alarme vide, veuillez ajouter une alarme</Text>
        ) : (
          <View style={styles.list}>
        
            <FlatList
              data={alarmList}
              renderItem={itemAlarm}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      <View style={styles.buttonContainer}>
        <Button
          mode="elevated"
          style={[styles.button, { display: isPressed ? "flex" : "none" }]}
          onPress={() => {
            cancelSelection();
          }}
        >
          Annuler
        </Button>
        <Button
          mode="elevated"
          style={[styles.button, { display: isPressed ? "flex" : "none" }]}
          onPress={() => {
            deleteSelection();
          }}
        >
          Supprimer
        </Button>
        {/* <Button
                    style={[styles.button, { display: !isPressed ? 'flex' : 'none' }]}
                    icon="plus"
                    onPress={() => { addAlarm(); } } children={undefined} >
                </Button> */}
      </View>
    </View>
  );
};

export default AlarmListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  list: {
    flex: 8,
  },
  alarmeVide:{
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    margin: 10,
  },
});
