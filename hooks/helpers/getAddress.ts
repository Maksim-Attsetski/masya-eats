import * as Location from 'expo-location';

export const getAddress = (
  street?: string | null | Location.LocationGeocodedAddress,
  streetNumber?: string | null
): string => {
  if (!street) return '';

  if (typeof street === 'string') {
    return streetNumber ? street + ', ' + streetNumber : street;
  } else {
    return streetNumber
      ? street?.street + ', ' + street?.streetNumber
      : street?.street ?? '';
  }
};
