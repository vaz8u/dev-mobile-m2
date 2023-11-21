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

  // expose the functions and data you want to use in other components
  return { getLocation };
};

export default GeolocationService;
