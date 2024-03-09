import * as ICAL from 'ical.js';
import RNCalendarEvents from 'react-native-calendar-events';// https://github.com/wmcmahan/react-native-calendar-events
import { Evenement, Calendrier } from '../models/Evenement';
import liensEDT from '../assets/liensEDT.json';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import * as DP from 'expo-document-picker';

export function getLienEDT_FAC(classe:string): string {
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
        // Supprimer les duplications dans la description
        const descriptionLines = event.description.split('\n');
        const uniqueDescriptionLines = [...new Set(descriptionLines)];
        const uniqueDescription = uniqueDescriptionLines.join('\n');

        return {
            summary: event.summary,
            start: event.startDate.toString(),
            end: event.endDate.toString(),
            location: event.location,
            description: uniqueDescription
        };
    });
    console.log(events);
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

// Retourne les calendriers détectés dans le téléphone sous forme de liste de string
export async function getCalendriers(): Promise<any>{
    let requete = await RNCalendarEvents.requestPermissions();
    if(requete !== 'authorized')
        return [requete];
    if(await RNCalendarEvents.checkPermissions()){
        let calendars = await RNCalendarEvents.findCalendars();
        let events = await RNCalendarEvents.fetchAllEvents(new Date().toISOString(), new Date(2024, 12, 31).toISOString());
        afficherCalendriersTrouvees(calendars, events); // DEBUG
        return calendars.map((calendar: any) => calendar.title); 
    }
    return [];
}

// Ajoute le calendrier à la liste des calendriers de l'utilisateur
export async function getAndSetCalendriers(nomCalendrier:string): Promise<any>{
    let events = await RNCalendarEvents.fetchAllEvents(new Date().toISOString(), new Date(2024, 12, 31).toISOString());
    // Récuperer les evenements du calendrier
    let eventsCalendrier = events.filter((event: any) => event.calendar.title === nomCalendrier);
    // Créer le calendrier
    let calendrier = new Calendrier(creerElementsCalendrierFromJson(eventsCalendrier), nomCalendrier, 'blue');
    // Appel API
    return await addCalendrier(calendrier)
}

export function afficherCalendriersTrouvees(calendars: any, events: any){
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
        const file = await DP.getDocumentAsync({type: 'text/calendar'});
        let assets = file.assets;
        if(assets === null)
            return [];
        let res: Calendrier[] = [];
        for(const element of assets){
            const calendrier = new Calendrier(await convertIcsToJson(element.uri), element.name, 'blue');
            res.push(calendrier);
            console.log(calendrier);
        }
        return res;   
    } catch (err) {
        console.log('Document picker error: ',err);
    }
}

// FONCTIONS APPEL API //
// Ajouter un calendrier à l'utilisateur : ajoute le calendrier à la liste des calendriers de l'utilisateur
export async function addCalendrier(calendrier:Calendrier): Promise<any>{
    //TODO
    return true;
}

// Supprimer un calendrier de l'utilisateur : supprime le calendrier de la liste des calendriers de l'utilisateur
export async function deleteCalendrier(calendrier:string): Promise<any>{
    //TODO
    return true;
}

// Lire les calendriers de l'utilisateur : retourne la liste des calendriers de l'utilisateur
export async function readCalendriers(): Promise<any>{
    //TODO
    return [];
}
 
