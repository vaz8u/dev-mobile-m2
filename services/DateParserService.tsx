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