import { Calendrier, Evenement } from '../../../models/Evenement';
import { getLienEDT_FAC, convertIcsToJson, creerElementsCalendrierFromJson, getCalendriers, getAndSetCalendriers,afficherCalendriersTrouvees, afficherCalendriersTrouveesAvecViewText, importManuel, addCalendrier, deleteCalendrier } from '../../../services/ImportsCalendrier';
import * as DP from 'expo-document-picker';

// Test pour la fonction getLienEDT_FAC
test('getLienEDT_FAC', () => {
    const classe = 'SSI';
    const result = getLienEDT_FAC(classe);
    expect(result).toBeDefined();
});
const fileContent = `BEGIN:VCALENDAR
METHOD:PUBLISH
PRODID:-//ADE/version 6.0
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTAMP:20240207T161821Z
DTSTART:20240208T073000Z
DTEND:20240208T113000Z
SUMMARY:' PROJETS -  Intégration méthodologique IHM
LOCATION:Technopole_BN2-013
DESCRIPTION:\\n\\nTD Intégration méthodologique IHM\\nTD Intégration méthodo
 logique IHM\\nTD Intégration méthodologique IHM\\nTD Intégration méthodolo
 gique IHM\\nTD Intégration méthodologique IHM\\nTD Intégration méthodologi
 que IHM\\nTD Intégration méthodologique IHM\\nEnseignant 1\\n\\n(Modifié le:
 19/12/2023 12:01)
UID:ADE60322e706c616e6e696e67554c5f323032335f323032342d3133333534362d332d
 30
CREATED:19700101T000000Z
LAST-MODIFIED:20231219T110100Z
SEQUENCE:2141033201
END:VEVENT
END:VCALENDAR`;

// Test pour la fonction creerElementsCalendrierFromJson
test('creerElementsCalendrierFromJson', () => {
    const json = [
        {
            "summary": "' PROJETS -  Intégration méthodologique IHM",
            "start": "2024-02-08T07:30:00.000Z",
            "end": "2024-02-08T11:30:00.000Z",
            "location": "Technopole_BN2-013",
            "description": "TD Intégration méthodologique IHM"
        },
        {
            "summary": "Réunion d'équipe",
            "start": "2024-02-09T09:00:00.000Z",
            "end": "2024-02-09T10:00:00.000Z",
            "location": "Salle de conférence",
            "description": "Réunion hebdomadaire de l'équipe de projet"
        }
    ]
    ;
    const result = creerElementsCalendrierFromJson(json);
    expect(result).toBeDefined();
});
jest.mock('react-native-calendar-events', () => ({
    requestPermissions: jest.fn(() => Promise.resolve(true)),
    checkPermissions: jest.fn(() => Promise.resolve(true)),
    findCalendars: jest.fn(() => Promise.resolve([])),
    fetchAllEvents: jest.fn(() => Promise.resolve([])),
  }));
  
// Test pour la fonction getCalendriers
test('getCalendriers', async () => {
    const result = await getCalendriers();
    expect(result).toBeDefined();
});

// Test pour la fonction getAndSetCalendriers
test('getAndSetCalendriers', async () => {
    const nomCalendrier = 'calendrierTest';
    const result = await getAndSetCalendriers(nomCalendrier);
    expect(result).toBeDefined();
});

// Mock pour la classe Evenement
// Mock pour la classe Evenement
const mockEvenement = new Evenement(
    "' PROJETS -  Intégration méthodologique IHM",
    new Date('2024-02-08T07:30:00Z'),
    new Date('2024-02-08T11:30:00Z'),
    'Technopole_BN2-013',
    "\nTD Intégration méthodologique IHM\nEnseignant 1\n(Modifié le:19/12/2023 12:01)",
    'EDT'
);

// Mock pour la classe Calendrier
const mockCalendrier = new Calendrier(
    [mockEvenement],
    'fileName',
    'blue'
);

// Test pour la fonction afficherCalendriersTrouvees
test('afficherCalendriersTrouvees', () => {
    const calendriers = [mockCalendrier];
    const events = [mockEvenement, mockEvenement];
     // Créer un espion sur console.log
     const spy = jest.spyOn(console, 'log');
    afficherCalendriersTrouvees(calendriers, events);
        // Vérifier que console.log a été appelé
        expect(spy).toHaveBeenCalled();

        // Restaurer console.log à son comportement original
        spy.mockRestore();
});

// Test pour la fonction afficherCalendriersTrouveesAvecViewText
test('afficherCalendriersTrouveesAvecViewText', () => {
    const result = afficherCalendriersTrouveesAvecViewText(mockCalendrier, mockEvenement);
    expect(result).toBeDefined();
});



// Test pour la fonction addCalendrier
test('addCalendrier', async () => {
    const result = await addCalendrier(mockCalendrier);
    expect(result).toBeTruthy();
});

// Test pour la fonction deleteCalendrier
test('deleteCalendrier', async () => {
    const nomCalendrier = 'calendrierTest';
    const result = await deleteCalendrier(nomCalendrier);
    expect(result).toBeTruthy();
});