import React, { useEffect, FC, memo, PropsWithChildren } from 'react';
import * as Location from 'expo-location';

import { IPermissions, useGlobalStore } from '@/global';
import { useDelivery } from '@/widgets/delivery';

const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setPermissions } = useGlobalStore();
  const { onAddUserLocationToAddress } = useDelivery();

  async function getPermission(): Promise<boolean> {
    const data = await Location.requestForegroundPermissionsAsync();
    return data.status === 'granted';
  }

  async function getCurrentLocation() {
    try {
      const isGranted = await getPermission();
      if (!isGranted) {
        return setPermissions({ location: null } as IPermissions);
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: 5,
      });

      const address = await Location.reverseGeocodeAsync({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
      const formattedAddress =
        address[0]?.street + ' ' + address[0]?.streetNumber;
      await onAddUserLocationToAddress(formattedAddress);
      setPermissions({ location } as IPermissions);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return <>{children}</>;
};

export default memo(LocationProvider);
