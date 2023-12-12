/**
 * Je veux pouvoir calculer l'heure d'activation de l'alarme à l'aide des différentes informations données :

Heure de début de travail/rdv (a)
Temps du trajet (b)
Temps pour se réveiller (c)
Temps pour arriver au lieu (d)
Calcul = a - (b + c + d)

/!\ à la conversion en heure : minutes
 */
// minutes en un jour : 1440

/**
 * debutTravail : heure de début de travail en minutes (à partir de 0h00)
 * tempsTrajet : temps du trajet en minutes
 * tempsReveil : temps pour se réveiller en minutes
 * tempsArriver : temps pour arriver au lieu en minutes
 **/
export function calculAlarme(debutTravail: number, tempsTrajet: number, tempsReveil: number, tempsArriver: number){
    try{
        // Calcul de l'heure d'activation de l'alarme
        let calcul = debutTravail - (tempsTrajet + tempsReveil + tempsArriver);
        // Si le résultat est négatif, on ajoute 24h
        if(calcul < 0)
            calcul = 1440 + calcul;
        return calcul;
    }catch(error){
        console.error('Erreur CalculAlarmeService.ts/calculAlarme :', error);
        throw error;
    }
}