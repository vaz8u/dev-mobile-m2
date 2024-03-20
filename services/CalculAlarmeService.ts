/**
 * debutTravail : heure de début de travail en minutes (à partir de 0h00)
 * tempsTrajet : temps du trajet en minutes
 * tempsReveil : temps pour se réveiller en minutes
 * tempsArriver : temps pour arriver au lieu en minutes
 **/
export function calculAlarme(debutTravail: number, tempsTrajet: number, tempsReveil: number, tempsArriver: number):number{
    // Calcul de l'heure d'activation de l'alarme
    let temps_en_moins:number = tempsTrajet + tempsReveil + tempsArriver;
    let calcul:number = debutTravail - temps_en_moins;
    // Si le résultat est négatif, on ajoute 24h
    if(calcul < 0)
        calcul = 1440 + calcul;
    return calcul;
}