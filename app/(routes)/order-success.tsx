import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { ContainerPadding, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/global';
import { Description, MiniHeader, Text } from '@/components';
import { getAddress } from '@/hooks';
import { useDelivery } from '@/widgets/delivery';
import { useOrder } from '@/widgets/order';
import { AntDesign } from '@expo/vector-icons';

const defaultCoordsObj = {
  latitude: 53,
  longitude: 27,
};

const OrderSuccess: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);

  const { orders } = useOrder();
  const insets = useSafeAreaInsets();

  const [restCoords, setRestCoords] = useState<LatLng>(defaultCoordsObj);
  const [myCoords, setMyCoords] = useState<LatLng>(defaultCoordsObj);

  const activeOrder = useMemo(() => orders.find((o) => o.created_at), [orders]);

  const getCoordsFromAddress = async () => {
    if (!activeOrder) return;
    setIsLoading(true);
    try {
      const newRestCoords = await Location.geocodeAsync(activeOrder?.from);
      const newMyCoords = await Location.geocodeAsync(
        getAddress(activeOrder.to)
      );

      if (!newRestCoords[0] || !newMyCoords[0]) {
        alert('Error');
      } else {
        setRestCoords(newRestCoords[0]);
        setMyCoords(newMyCoords[0]);
      }

      await onAnimateToRegion(newRestCoords[0] ?? newMyCoords[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAnimateToRegion = (props: Location.LocationGeocodedLocation) => {
    const { latitude, longitude } = props;

    mapRef.current?.animateToRegion({
      latitude,
      latitudeDelta: latitude / (SCREEN_HEIGHT * 20),
      longitude,
      longitudeDelta: longitude / (SCREEN_WIDTH * 20),
    });
  };

  useEffect(() => {
    getCoordsFromAddress();
  }, []);

  return (
    <>
      <RefreshControl refreshing={isLoading} />
      <MapView
        initialRegion={{
          latitude: 53.870014299999994,
          longitude: 27.553002499999998,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        <MapViewDirections
          apikey='AIzaSyCLFSyWrqnFmBETUjXRSVDvhTD55g5YOZw'
          destination={myCoords}
          origin={restCoords}
          strokeWidth={2}
          strokeColor='#333'
        />
      </MapView>

      <View
        style={{
          position: 'absolute',
          top: insets.top,
          left: ContainerPadding,
          right: ContainerPadding,
        }}
      >
        <MiniHeader
          title={'Заказ №' + activeOrder?.public_id}
          right={
            <View style={styles.infoBtn}>
              <AntDesign name='info' size={24} color='black' />
            </View>
          }
        />
      </View>
      <BottomSheet>
        <BottomSheetView style={styles.container}>
          <View>
            <Description title={'Цена'}>{activeOrder?.price}</Description>
            <Description title={'Время'}>
              {activeOrder?.delivery_time}
            </Description>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingHorizontal: ContainerPadding,
    paddingBottom: 6,
  },
  infoBtn: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 24,
  },
});

export default memo(OrderSuccess);
