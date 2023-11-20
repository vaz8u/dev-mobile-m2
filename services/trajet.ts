// tempsTrajet.ts

import { getKeyFromKeyVault } from './azure';

/* Fonction qui permet de convertir une adresse en coordonnées GPS
  * @param nrue : Numéro de rue
  * @param rue : Nom de rue
  * @param ville : Nom de la ville 
  * @returns {Promise<any>} : Résultat de la requête
 */
export async function adresseToCoords(nrue: string, rue: string, ville: string) {  
    // Création de l'adresse complète
    const adresse = `${nrue} ${rue},${ville},France`;
    const apiKey = getKeyFromKeyVault('ApiKeyTrajet');
  
    try {
      // Requête API
      const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${adresse}&format=json&apiKey=${apiKey}`, {
        method: 'GET',
      });
  
      // Si la requête a échoué
      if (!response.ok)
        throw new Error(`La requête adresseToCoords a échoué : ${response.status}`);
  
      // Si la requête a réussi
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('La fonction adresseToCoords a échoué : ', error);
    }
  }
  

  /* Fonction qui calcule la distance et le temps d'un trajet
  * @param depart : Lieu de départ
  * @param arrivee : Lieu d'arrivée
  * @returns {Promise<any>} : Résultat de la requête
  * @throws {Error} : Erreur lors du calcul du trajet
  */
export async function trajet(depart: any, arrivee: any) {
    try {
      // Récupére les coordonnées du lieu de départ
      const departCoords = await getCoordinates(depart);
      // Récupére les coordonnées du lieu d'arrivée
      const arriveeCoords = await getCoordinates(arrivee);
  
      // Calcule le trajet
      const result = await apiTrajet(departCoords, arriveeCoords);
  
      // Récupére la distance et le temps du trajet
      let distance = result.features[0].properties.distance;
      distance = (distance / 1000).toFixed(2);
      let time = result.features[0].properties.time;
      time = (time / 60).toFixed(0);

      return { distance, time };
    } catch (error) {
      // Erreur lors du calcul du trajet
      console.error('Erreur lors du calcul du trajet :', error);
      throw error;
    }
  }
  
  /* Fonction qui permet de convertir une adresse en coordonnées GPS
  * @param adresse : Adresse complète
  * @returns {Promise<string>} : Coordonnées GPS
  * @throws {Error} : Erreur lors de la récupération des coordonnées
  */
  export async function getCoordinates(adresse: any): Promise<string> {
    try {
      // Récupère les coordonnées de l'adresse
      const response = await adresseToCoords(adresse.nrue, adresse.rue, adresse.ville);
  
      // Extrait les coordonnées
      const lat = response.results[0].lat.toString().substring(0, 10);
      const lon = response.results[0].lon.toString().substring(0, 10);
  
      // Retourne les coordonnées GPS
      return `${lat},${lon}`;
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées :', error);
      throw error;
    }
  }  

  /* Fonction pour récupérer le trajet entre deux points
  * @param depart : Lieu de départ
  * @param arrivee : Lieu d'arrivée
  * @returns {Promise<any>} : Résultat de la requête
  */
export async function apiTrajet(depart: any, arrivee: any) {
  try {
    // Options de la requête
    const requestOptions = {
      method: 'GET',
    };

    const apiKey = getKeyFromKeyVault('ApiKeyTrajet');

    // Paramètres de la requête
    const mode = 'drive';

    // Requête avec les paramètres
    const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${depart}|${arrivee}&mode=${mode}&apiKey=${apiKey}`, requestOptions);

    // Si la requête n'a pas abouti
    if (!response.ok)
      throw new Error(`La requête apiTrajet a échoué : ${response.status}`);

    // Résultat de la requête 
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erreur lors de la requête apiTrajet :', error);
    throw error;
  }
}

/* useState à ajouter dans le composant pour récupérer le trajet

const [trajet, setTrajet] = useState<string>();
  let adresse = { nrue: '', rue: '', ville: 'Nancy' };
  let adresse2 = { nrue: '', rue: '', ville: 'Metz' };

  useEffect(() => {
    async function fetchCoords() {
      const result3 = await tempsTrajet.trajet(adresse, adresse2);
      setTrajet(`${result3.distance} km - ${result3.time} min`);
    }
    fetchCoords();
  }, []);


*/