import { getLienEDT_FAC, convertIcsToJson, creerElementsCalendrierFromJson, getCalendriers, getAndSetCalendriers, afficherCalendriersTrouvees, afficherCalendriersTrouveesAvecViewText, importManuel } from '../../../services/ImportsCalendrier';
import RNCalendarEvents, { CalendarEventReadable } from 'react-native-calendar-events';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

describe('getLienEDT_FAC', () => {
  it('retourne le bon lien pour une classe donnée', () => {
    const classe = 'ihm'; 
    const expectedLink = 'https://planning.univ-lorraine.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=158863&projectId=11&calType=ical&nbWeeks=20';

    expect(getLienEDT_FAC(classe)).toEqual(expectedLink);
  });
});

/*
describe('convertIcsToJson', () => {
  it('convertit correctement les données ICS en JSON', async () => {
    const data = '../../../assets/test.ics';
    const expectedJson = [
        {
          description: `
      TD Intégration méthodologique IHM
      Enseignant 1
      
      (Modifié le:19/12/2023 12:01)`,
          end: "2024-02-08T11:30:00Z",
          location: "Technopole_BN2-013",
          start: "2024-02-08T07:30:00Z",
          summary: "' PROJETS -  Intégration méthodologique IHM"
        }
      ];
    const result = await convertIcsToJson(data);
    expect(result).toEqual(expectedJson);
  });
});*/

describe('creerElementsCalendrierFromJson', () => {
    it('crée correctement les éléments du calendrier à partir du JSON', () => {
      const json = [
        {
          summary: 'Résumé de test',
          start: '2024-02-08T07:30:00Z',
          end: '2024-02-08T11:30:00Z',
          location: 'Location de test',
          description: 'Description de test'
        }
      ];
      const expectedElements = [
        {
          titre: 'Résumé de test',
          startDate: new Date('2024-02-08T07:30:00Z'),
          endDate: new Date('2024-02-08T11:30:00Z'),
          location: 'Location de test',
          description: 'Description de test',
          calendrier: 'EDT'
        }
      ];
  
      expect(creerElementsCalendrierFromJson(json)).toEqual(expectedElements);
    });
  });
  
  describe('getCalendriers', () => {
    it('retourne les calendriers détectés dans le téléphone', async () => {
      jest.mock('react-native-calendar-events', () => ({
        requestPermissions: jest.fn(() => Promise.resolve(true)),
        checkPermissions: jest.fn(() => Promise.resolve(true)),
        findCalendars: jest.fn(() => Promise.resolve([{ title: 'Calendrier de test' }])),
        fetchAllEvents: jest.fn(() => Promise.resolve([]))
      }));
  
      const expectedCalendars = ['Calendrier de test'];
  
      const result = await getCalendriers();
      expect(result).toEqual(expectedCalendars);
    });
  });

  jest.mock('react-native-calendar-events');
  jest.mock('react-native-document-picker', () => ({
    pick: jest.fn(),
  }));
  
  describe('Test des fonctions', () => {
    test('getAndSetCalendriers', async () => {
            const events: CalendarEventReadable[] = [{
                id: '1',
                title: 'Mon événement',
                startDate: '2024-01-01T00:00:00.000Z',
                calendar: { 
                    id: '1', 
                    type: 'local', 
                    source: '', 
                    isPrimary: true, 
                    title: 'Mon Calendrier',
                    allowsModifications: true,
                    color: '#FFFFFF',
                    allowedAvailabilities: []
                }
            }];
            const mockedFetchAllEvents = RNCalendarEvents.fetchAllEvents as jest.MockedFunction<typeof RNCalendarEvents.fetchAllEvents>;
            mockedFetchAllEvents.mockResolvedValue(events);
            const result = await getAndSetCalendriers('Mon Calendrier');
            expect(result).toBeDefined();
            // Ajoutez plus d'assertions en fonction de ce que la fonction addCalendrier est censée retourner
    });
    
  
    test('afficherCalendriersTrouvees', () => {
      console.log = jest.fn();
      const calendars = [{ title: 'Mon Calendrier', source: 'Source', events: [] }];
      const events = [{ title: 'Mon événement', source: 'Source' }];
      afficherCalendriersTrouvees(calendars, events);
      expect(console.log).toHaveBeenCalled();
    });
  
    test('importManuel', async () => {
        const files: DocumentPickerResponse[] = [{ 
            uri: 'file://monFichier.ics', 
            name: 'Mon Calendrier',
            fileCopyUri: '',
            type: '',
            size: 0
        }];
        const mockedPick = DocumentPicker.pick as jest.MockedFunction<typeof DocumentPicker.pick>;
        mockedPick.mockResolvedValue(files);
        const result = await importManuel();
        expect(result).toBeDefined();
    });
  });