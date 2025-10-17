import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { Location } from '../types/shift';

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need access to your location to show available shifts',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Android permission error:', err);
      return false;
    }
  }
  
  // for iOS, permission must be granted manually in settings
  return true;
}

export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.error('Geolocation error:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  });
}