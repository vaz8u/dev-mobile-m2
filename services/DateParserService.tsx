import moment from "moment";

/**
 * Récupère la date
 **/
export function parseAlarmDate(alarmDateString: string){
    const alarmDate = new Date(alarmDateString);
    const year = alarmDate.getUTCFullYear();
    const month = String(alarmDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(alarmDate.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
/**
 * Récupère le temps exact de déclenchement
 **/
export function parseAlarmTime(alarmDateString: string){
    const alarmDate = new Date(alarmDateString);
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(alarmDate);
}

export function getHoursFromAlarmTime(alarmTimeString: string): number {
    const [hourString] = alarmTimeString.split(':');
    return parseInt(hourString, 10);
}

export function getMinutesFromAlarmTime(alarmTimeString: string): number {
    const [, minuteString] = alarmTimeString.split(':');
    return parseInt(minuteString, 10);
}

export function formatToISOString(date:Date, hour:number, minute:number) {
    // Create a new Date object with the provided components
    const formattedDate = new Date(date);
    formattedDate.setHours(hour);
    formattedDate.setMinutes(minute);

    // Use toISOString to get the date in ISO 8601 format
    const isoString = formattedDate.toISOString();

    return isoString;
}

export function getWeekday(selectedDate: Date) {
    const frenchWeekdayName = moment(selectedDate).locale('fr').format('dddd');
    const capitalizedFrenchWeekdayName = frenchWeekdayName.charAt(0).toUpperCase() + frenchWeekdayName.slice(1);
    return capitalizedFrenchWeekdayName;
};

export function getWeekdayAbbreviation(selectedDate: Date) {
    return getWeekday(selectedDate).substring(0, 2);
}