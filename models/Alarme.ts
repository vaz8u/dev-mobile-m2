export class Alarme {
    name: string;

    transportMethod!: string;

    // 
    departure!: string;
    arrival!: string;

    //extraTime
    wakeUpTime!: string;
    arriveTime!: string;

    repetition!: boolean;
    days!: boolean[];

    arrivalTime!: string;
    departureTime!: string;

    triggeredDate!: string;
    alarmSound!: boolean;
    vibratorSound!: boolean;
    activated!: boolean;

    constructor(name: string) {
        this.name = name;
    }

    setTransportMethod(transportMethod: string) {
        this.transportMethod = transportMethod;
    }

    setDeparture(departure: string) {
        this.departure = departure;
    }

    setArrival(arrival: string) {
        this.arrival = arrival;
    }

    setWakeUpTime(wakeUpTime: string) {
        this.wakeUpTime = wakeUpTime;
    }

    setArriveTime(arriveTime: string) {
        this.arriveTime = arriveTime;
    }

    setRepetition(repetition: boolean) {
        this.repetition = repetition;
    }

    setDays(days: boolean[]) {
        this.days = days;
    }

    setArrivalTime(arrivalTime: string) {
        this.arrivalTime = arrivalTime;
    }

    setDepartureTime(departureTime: string) {
        this.departureTime = departureTime;
    }

    setTriggeredDate(triggeredDate: string) {
        this.triggeredDate = triggeredDate;
    }

    setAlarmSound(alarmSound: boolean) {
        this.alarmSound = alarmSound;
    }

    setVibratorSound(vibratorSound: boolean) {
        this.vibratorSound = vibratorSound;
    }

    setActivated(activated: boolean) {
        this.activated = activated;
    }

    valide():boolean {
        return !(
            this.name == "" ||
            this.departure == "" ||
            this.arrival == "" ||
            this.arrivalTime == "" ||
            this.departureTime == ""
        );
    }

    tostring():string {
        return "name: " + this.name + "\n" + 
        "transportMethod: " + this.transportMethod + "\n" +
        "departure: " + this.departure + "\n" +
        "arrival: " + this.arrival + "\n" +
        "wakeUpTime: " + this.wakeUpTime + "\n" +
        "arriveTime: " + this.arriveTime + "\n" +
        "repetition: " + this.repetition + "\n" +
        "days: " + this.days + "\n" +
        "arrivalTime: " + this.arrivalTime + "\n" +
        "departureTime: " + this.departureTime + "\n" +
        "triggeredDate: " + this.triggeredDate + "\n" +
        "alarmSound: " + this.alarmSound + "\n" +
        "vibratorSound: " + this.vibratorSound + "\n" +
        "activated: " + this.activated;
    }
}
