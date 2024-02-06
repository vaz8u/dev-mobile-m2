import * as ICAL from 'ical.js';
import RNCalendarEvents from 'react-native-calendar-events';// https://github.com/wmcmahan/react-native-calendar-events
import { Evenement } from '../models/Evenement';
import liensEDT from '../assets/liensEDT.json';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

function getLienEDT_FAC(classe:string): string {
    // id = 'base'
    let res = liensEDT.find((lien: any) => lien.id === 'base')?.code;
    // id = 'classe'
    let res2 = liensEDT.find((lien: any) => lien.id === classe)?.code;
    // remplacer 'DATA' par le code de la classe
    res = res?.replace('DATA', res2 ?? '');
    return res ?? '';
}

export async function convertIcsToJson(_data:string): Promise<any> {
    // Télécharger le fichier
    const response = await fetch(_data);
    const data = await response.text();

    // Lire le contenu du fichier
    const icsData = data;
    // Analyser le contenu du fichier avec ical.js
    const jcalData = ICAL.parse(icsData);
    const comp = new ICAL.Component(jcalData);

    // Convertir chaque événement en JSON
    const events = comp.getAllSubcomponents('vevent').map((vevent: any) => {
        const event = new ICAL.Event(vevent);
        return {
            summary: event.summary,
            start: event.startDate.toString(),
            end: event.endDate.toString(),
            location: event.location,
            description: event.description
        };
    });

    console.log(JSON.stringify(events, null, 2));
    return events;
}


export function creerElementsCalendrierFromJson(json: any): Evenement[] {
    // Créer un tableau d'éléments de calendrier
    const elementsCalendrier = json.map((event: any) => {
        return {
            titre: event.summary,
            startDate: new Date(event.start),
            endDate: new Date(event.end),
            location: event.location,
            description: event.description,
            calendrier: 'EDT'
        };
    });
    return elementsCalendrier;
}

export async function getCalendriers(): Promise<any>{
    await RNCalendarEvents.requestPermissions();
    if(await RNCalendarEvents.checkPermissions()){
        let calendars = await RNCalendarEvents.findCalendars();
        let events = await RNCalendarEvents.fetchAllEvents(new Date().toISOString(), new Date(2024, 12, 31).toISOString());
        afficherCalendriersTrouvees(calendars, events);
        // retourne les calendrier sous forme de liste de string
        return calendars.map((calendar: any) => calendar.title);
    }
}

function afficherCalendriersTrouvees(calendars: any, events: any){
    console.log('Calendriers trouvés:');
    calendars.forEach((calendar: any) => {
        console.log(`\t${calendar.title} (${calendar.source})`);
        console.log(calendar.events);
    });
    console.log('Evénements trouvés:');
    events.forEach((event: any) => {
        console.log(`\t${event.title} (${event.source})`);
    });
    
}

// affiche un bouton avec une liste des calendriers avec View et Text
export function afficherCalendriersTrouveesAvecViewText(calendars: any, events: any){
    return (
        <View>
            <Button onPress={() => {afficherCalendriersTrouvees(calendars, events)}}>Importer des Calendriers</Button>
        </View>
    );
}


// IMPORT MANUEL //
export async function importManuel(): Promise<any>{
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log(res);
        return res;
    } catch (err) {
        if (DocumentPicker.isCancel(err))
            console.log('Document picker cancelled');
        else
            console.log('Document picker error: ',err);
    }
}

// FONCTIONS APPEL API //
// Ajouter un calendrier à l'utilisateur : ajoute le calendrier à la liste des calendriers de l'utilisateur
export async function addCalendrier(calendrier:any): Promise<any>{
    //TODO
    return true;
}

// Supprimer un calendrier de l'utilisateur : supprime le calendrier de la liste des calendriers de l'utilisateur
export async function deleteCalendrier(calendrier:any): Promise<any>{
    //TODO
    return true;
}

// Lire les calendriers de l'utilisateur : retourne la liste des calendriers de l'utilisateur
export async function readCalendriers(): Promise<any>{
    //TODO
    return [];
}
 
