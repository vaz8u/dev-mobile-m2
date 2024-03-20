import * as Location from "expo-location";
/**
 * GeolocationService provides functions for obtaining the user's GPS coordinates.
 */
const GeolocationService = () => {

  /**
   * Asks the user for permission to access GPS coordinates and retrieves the current location.
   * @returns {Promise<Location.LocationObject | null>} A promise that resolves to the GPS coordinates if permission is granted, or null otherwise.
   */
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return null;
      }

      let location = await Location.getCurrentPositionAsync();
      return location;
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return null;
    }
  };

  const getLocationWithAdresse = async (adress : string) => {
    const geocodedLocation = await Location.geocodeAsync(adress);
    console.log(geocodedLocation);
    return geocodedLocation;
  };

  const getReverseLocation = async (latitude : number, longitude: number) => {
    const reverseGeolocalisationAdress = await Location.reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude
    })
    console.log("Adresse : " + reverseGeolocalisationAdress);
    return reverseGeolocalisationAdress;
  };

  // expose the functions and data you want to use in other components
  return { getLocation, getLocationWithAdresse, getReverseLocation };
};

export default GeolocationService;
