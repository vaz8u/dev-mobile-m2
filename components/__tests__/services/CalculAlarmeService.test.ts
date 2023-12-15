// Tests pour le fichier ./services/CalculAlarmeService.ts

import { calculAlarme } from '../../../services/CalculAlarmeService';

describe('calculAlarme', () => {
  it('devrait calculer l\'heure d\'activation de l\'alarme correctement', () => {
    // valeurs de test
    const debutTravail = 480; // 8h00
    const tempsTrajet = 30; 
    const tempsReveil = 20; 
    const tempsArriver = 15; 

    // appel fonction
    const resultat = calculAlarme(debutTravail, tempsTrajet, tempsReveil, tempsArriver);

    // Le résultat devrait être 480 - (30 + 20 + 15) = 415
    const heureAttendue = 415; // 6h55

    // Vérification du résultat
    expect(resultat).toBe(heureAttendue);
  });

  it('devrait calculer l\'heure d\'activation de l\'alarme correctement si s\'allume la veille', () => {
    // valeurs de test
    const debutTravail = 1000; // 16h40
    const tempsTrajet = 700; // 11h40
    const tempsReveil = 300; // 5h00
    const tempsArriver = 200; // 3h20

    // appel fonction
    const resultat = calculAlarme(debutTravail, tempsTrajet, tempsReveil, tempsArriver);

    // Le résultat devrait être 1000 - (700 + 300 + 200) = -200, donc ajout de 1440 pour obtenir 1240
    const heureAttendue = 1240; // 20h40

    // Vérification du résultat
    expect(resultat).toBe(heureAttendue);
  });
});
