import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MapView, { LatLng } from 'react-native-maps';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Flex, Gap, MiniHeader, Text } from '@/components';
import {
  ContainerPadding,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  staticColors,
} from '@/global';
import { router } from 'expo-router';

const Map: FC = () => {
  const [coords, setCoords] = useState<LatLng>({ latitude: 53, longitude: 27 });
  const [newAddress, setNewAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);

  const insets = useSafeAreaInsets();

  const getAddress = async () => {
    setIsLoading(true);
    try {
      const address = await Location.reverseGeocodeAsync(coords);
      if (address?.[0]) setNewAddress(address?.[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressChooseAddress = async () => {
    await getAddress();
    bottomSheetRef.current?.snapToIndex(0);
  };

  const onGetMyLocation = async () => {
    const response = await Location.getCurrentPositionAsync({ accuracy: 6 });
    return response.coords;
  };

  const onAnimateToRegion = (props: Location.LocationObjectCoords) => {
    const { latitude, longitude } = props;

    mapRef.current?.animateToRegion({
      latitude,
      latitudeDelta: latitude / (SCREEN_HEIGHT * 20),
      longitude,
      longitudeDelta: longitude / (SCREEN_WIDTH * 20),
    });
  };

  const onPressMyLocationBtn = async () => {
    try {
      setIsLoading(true);
      const response = await onGetMyLocation();
      await onAnimateToRegion(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressConfirmAddress = async () => {
    router.push({
      pathname: '/(routes)/update-address',
      params: { address: JSON.stringify(newAddress) },
    });
  };

  useEffect(() => {
    onGetMyLocation().then(onAnimateToRegion);
  }, []);

  return (
    <>
      <View>
        <MapView
          ref={mapRef}
          zoomEnabled
          zoomTapEnabled
          showsIndoors
          showsPointsOfInterest
          showsBuildings
          onRegionChangeComplete={(event) => {
            setCoords({ latitude: event.latitude, longitude: event.longitude });
          }}
          initialCamera={{ center: coords, zoom: 5, heading: 1, pitch: 0 }}
          style={styles.map}
        />
      </View>
      <View style={[styles.header, { top: insets.top }]}>
        <MiniHeader
          title={
            newAddress
              ? newAddress?.street + ', ' + newAddress?.streetNumber
              : ''
          }
        />
      </View>
      <Flex style={styles.marker}>
        <MaterialCommunityIcons
          name='map-marker'
          size={24}
          color={staticColors.primary.bg}
        />
      </Flex>
      <Flex style={styles.buttonContainer}>
        <Button
          btnProps={{ onPress: onPressMyLocationBtn, disabled: isLoading }}
        >
          <MaterialCommunityIcons name='target' size={24} color='black' />
        </Button>
        <Button
          type='primary'
          full
          btnProps={{ onPress: onPressChooseAddress, disabled: isLoading }}
        >
          {isLoading ? 'Ссссупер поиск...' : 'Выбрать'}
        </Button>
      </Flex>
      <BottomSheet
        enableDynamicSizing
        enablePanDownToClose
        index={-1}
        ref={bottomSheetRef}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <Text title center>
            {isLoading
              ? 'Ищем то, что вы выбрали'
              : `Вы выбрали «${
                  newAddress?.street + ', ' + newAddress?.streetNumber
                }»`}
          </Text>
          <Gap y={20} />
          <Flex justify='space-between'>
            <Button
              full
              btnProps={{ onPress: () => bottomSheetRef.current?.close() }}
            >
              Ещё раз
            </Button>
            <Button
              full
              type='primary'
              btnProps={{ onPress: onPressConfirmAddress }}
            >
              Продолжить
            </Button>
          </Flex>
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
  header: {
    position: 'absolute',
    left: ContainerPadding,
    right: ContainerPadding,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: ContainerPadding,
    right: ContainerPadding,
  },
  marker: {
    position: 'absolute',
    top: '47%',
    left: '47%',
  },
  bottomSheet: { paddingVertical: 20, paddingHorizontal: ContainerPadding },
});

export default memo(Map);
