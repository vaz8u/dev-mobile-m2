export interface NotifAlarme {
    id: number;
    title: string;
    body: string;
    date: Date;
    sound: string|boolean;
}