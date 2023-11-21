function calculateAlarmTime(date: Date, time: number): Date {
    const newDate: number = date.getTime() - time;
    return new Date(newDate);
}