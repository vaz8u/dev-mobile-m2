export interface NotifAlarme {
    id: string;
    title: string;
    body: string;
    date: Date;
    sound: string|boolean;
    data: any;
    vibrate: number[]|boolean;
}