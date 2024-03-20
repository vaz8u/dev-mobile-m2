

import { Alert, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import ToggleParameter from './ToggleParameter';
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { setNotification } from '../services/NotifAlarmeService';

import { DatePicker } from "./DatePicker";

// Models
import { Alarme } from "../models/Alarme";

// Composants
import MethodeTransport from "./createAlarmAdvancedComponents/methodeTransport";
import Adresses from "./createAlarmAdvancedComponents/adresses";
import TempsSupplementaire from "./createAlarmAdvancedComponents/tempsSupplementaire";
import RedondanceSemaine from "./createAlarmAdvancedComponents/redondanceSemaine";
import HeureArrivee from "./createAlarmAdvancedComponents/heureArrivee";
import HeureDepart from "./createAlarmAdvancedComponents/heureDepart";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import GeolocationService from "../services/GeolocationService";
import { CreateAlarmInput } from "../wake-up-api/src/alarms/dto/create-alarm.input";
import {
  useCreateAlarm,
  useGetAlarmsByUserId,
} from "../services/api/graphqlService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdvancedAlarmForm = () => {
  // Methode de transport
  const [transport, setTransport] = useState("drive");

  // Temps supplémentaire
  const [tempsLever, setTempsLever] = useState("");
  const [tempsArriver, setTempsArriver] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Redondance semaine
  const [isClickedAvatar, setIsClickedAvatar] = useState(Array(7).fill(false));
  const [isRandondence, setIsRandondence] = useState(false);
  // active ou desactive tout les avatars
  const rendondanceSwitch = () => {
    setIsRandondence(!isRandondence);
    for (const element of isClickedAvatar) {
      const newIsClickedAvatar = isClickedAvatar.map((value) => {
        return !isRandondence;
      });
      setIsClickedAvatar(newIsClickedAvatar);
    }
  };
  // active ou desactive un avatar
  const handleAvatarClick = (jour: number) => () => {
    const newIsClickedAvatar = isClickedAvatar.map((value, index) => {
      if (index === jour) {
        return !value;
      }
      return value;
    });
    setIsClickedAvatar(newIsClickedAvatar);
  };

  const navigation = useRouter();
  const [isAlarmSoundActivated, setIsAlarmSoundActivated] = useState(false);
  const [isVibratorActivated, setIsVibratorActivated] = useState(false);
  const [createAlarm] = useCreateAlarm();
  const [userId, setUserId] = useState("");

  const { refetch } = useGetAlarmsByUserId(userId);

  const { getLocationWithAdresse } = GeolocationService();

  const handleCancelButtonPress = () => {
    navigation.push("/");
  };

  const handleToggleParameter = (paramTitle: string) => {
    if (paramTitle === "Son de l'alarme") {
      setIsAlarmSoundActivated(!isAlarmSoundActivated);
    } else if (paramTitle === "Vibreur") {
      setIsVibratorActivated(!isVibratorActivated);
    }
  };

  const {
    control,

    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Departure: "",
      Arrival: "",
      DepartureTime: "",
      ArrivalTime: "",
      heureArrivee: "",
      heureDepart: "",
    },
  });

  const onSubmit = async (data: any) => {
    let alarme = new Alarme(data.Name);

    alarme.setTransportMethod(transport);

    alarme.setDeparture(data.Departure);
    alarme.setArrival(data.Arrival);

    alarme.setWakeUpTime(data.DepartureTime);
    alarme.setArriveTime(data.ArrivalTime);

    alarme.setRepetition(isRandondence);
    alarme.setDays(isClickedAvatar);

    alarme.setDepartureTime(data.heureDepart);
    alarme.setArrivalTime(data.heureArrivee);

    alarme.setTriggeredDate(selectedDate.toISOString());
    // changer les heures et minutes de TriggeredDate pour correspondre à heureDepart
    let date = new Date(alarme.triggeredDate);
    console.log(alarme.departureTime.split(":")[0]);
    console.log(alarme.departureTime.split(":")[1]);
    date.setHours(parseInt(alarme.departureTime.split(":")[0]));
    date.setMinutes(parseInt(alarme.departureTime.split(":")[1]));
    date.setSeconds(0);
    alarme.setTriggeredDate(date.toISOString());
    console.log(alarme.triggeredDate);
    alarme.setAlarmSound(isAlarmSoundActivated);
    alarme.setVibratorSound(isVibratorActivated);
    alarme.setActivated(true);

    console.log(alarme);
    console.log(alarme.valide());
    if (alarme.valide()) {
      const input: CreateAlarmInput = {
        name: alarme.name,
        transportMethod: alarme.transportMethod,
        departure: alarme.departure,
        arrival: alarme.arrival,
        wakeUpTime: alarme.wakeUpTime,
        arriveTime: alarme.arriveTime,
        repetition: alarme.repetition,
        days: alarme.days,
        arrivalTime: alarme.arrivalTime,
        departureTime: alarme.departureTime,
        triggeredDate: alarme.triggeredDate,
        alarmSound: alarme.alarmSound,
        vibratorSound: alarme.vibratorSound,
        activated: alarme.activated,
      };
      try{
        await createAlarm({ variables: { alarmInput: input } });
        refetch();
        if(await setNotification(alarme)){
          Alert.alert("Succès", "Alarme créée avec succès");
          navigation.push("/");
        }
        else {
          Alert.alert("Erreur", "Erreur lors de la création de l'alarme, veuillez revoir les données saisies");
        }
      }
      catch(e){
        Alert.alert("Erreur", "Erreur lors de la création de l'alarme à la base de données");
      }
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("userId").then((value) => {
      setUserId(value ?? "");
    });
  }, []);

  return (
    <ScrollView style={[styles.scene]}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nom de l'alarme"
            value={value}
            mode="outlined"
            placeholder="Alarme .."
            right={<TextInput.Icon icon="close" />}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        name="Name"
      />
      {errors.Name && (
        <Text style={[styles.text]}>L'alarme n'a pas de nom</Text>
      )}

      <MethodeTransport transport={transport} setTransport={setTransport} />

      <Adresses control={control} errors={errors} />

      <TempsSupplementaire
        tempsLever={tempsLever}
        setTempsLever={setTempsLever}
        tempsArriver={tempsArriver}
        setTempsArriver={setTempsArriver}
      />

      <RedondanceSemaine
        isRandondence={isRandondence}
        rendondanceSwitch={rendondanceSwitch}
        isClickedAvatar={isClickedAvatar}
        handleAvatarClick={handleAvatarClick}
      />

      <HeureArrivee control={control} errors={errors} />

      <HeureDepart
        transport={transport}
        control={control}
        errors={errors}
        getValues={getValues}
      />

      <DatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      ></DatePicker>

      <Card style={styles.cartes}>
        <ToggleParameter
          paramTitle="Son de l'alarme"
          isParamActivated={isAlarmSoundActivated}
          onToggle={handleToggleParameter}
        />
        <ToggleParameter
          paramTitle="Vibreur"
          isParamActivated={isVibratorActivated}
          onToggle={handleToggleParameter}
        />
      </Card>

      <Card style={{ marginBottom: 40, marginTop: 5 }}>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={handleCancelButtonPress}
            disabled={false}
          >
            Annuler
          </Button>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Créer
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

export default AdvancedAlarmForm;
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textField: {
    flex: 1, // Allow TextInput to take up remaining space
    marginRight: 8, // Add some space between TextInput and Button
    marginTop: 8,
  },
  text: {
    color: "red",
  },
  tempsContainer: {
    flexDirection: "row", // Aligner les éléments horizontalement
    justifyContent: "space-between", // Répartir l'espace entre les éléments
    backgroundColor: "transparent",
  },
  input: {
    flex: 1, // Partager l'espace de manière égale
    marginRight: 8, // Espacement entre les éléments
  },
  cartes: {
    marginTop: 5,
  },
  carteTitre: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
