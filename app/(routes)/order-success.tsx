import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { ContainerPadding, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/global';
import {
  Description,
  Divider,
  Flex,
  Gap,
  MiniHeader,
  ProgressBar,
  Text,
} from '@/components';
import { checkOrderProgress, getAddress, getPaymentType } from '@/hooks';
import { useDelivery } from '@/widgets/delivery';
import { IOrder, useOrder } from '@/widgets/order';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [progress, setProgress] = useState<number>(
    checkOrderProgress(activeOrder)
  );

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
        setRestCoords({
          latitude: newRestCoords[0].latitude,
          longitude: newRestCoords[0].longitude,
        });
        setMyCoords({
          latitude: newMyCoords[0].latitude,
          longitude: newMyCoords[0].longitude,
        });
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
    const timer = setInterval(() => {
      const newProgress = checkOrderProgress(activeOrder);
      setProgress(newProgress);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [activeOrder]);

  useEffect(() => {
    getCoordsFromAddress();
  }, [activeOrder]);

  return (
    <>
      <RefreshControl refreshing={isLoading} />
      <MapView ref={mapRef} style={styles.map} provider={PROVIDER_GOOGLE}>
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
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.snapToIndex(0)}
              style={styles.infoBtn}
            >
              <AntDesign name='info' size={24} color='black' />
            </TouchableOpacity>
          }
        />
      </View>
      <BottomSheet index={-1} enablePanDownToClose ref={bottomSheetRef}>
        <BottomSheetView style={styles.container}>
          <View>
            <Text title center>
              Ваш заказ выполнен {progress === 100 ? '' : `на ${progress}%`}
            </Text>
            <Gap y={8} />
            <ProgressBar progress={progress} />
            <Gap />
            <Gap />
            <Text title>Адреса</Text>
            <Gap y={8} />
            <Flex>
              <Description title={'Откуда'}>{activeOrder?.from}</Description>
              <Text>{'->'}</Text>
              <Description title={'Куда'}>{activeOrder?.to}</Description>
            </Flex>
            <Divider />
            <Text title>Детали</Text>
            <Gap y={8} />
            <Flex gap={20}>
              <Description title={'Цена'}>{activeOrder?.price} Br</Description>
              <Description title={'Скидка'}>
                {activeOrder?.discount} Br
              </Description>
              <Description title={'Время'}>
                {activeOrder?.delivery_time} мин.
              </Description>
            </Flex>
            <Divider />
            <Text title>Оплата</Text>
            <Gap y={8} />
            <Flex>
              {activeOrder?.paymaent_type === 'cash' ? (
                <MaterialCommunityIcons
                  name='cash-multiple'
                  size={24}
                  color='green'
                />
              ) : (
                <MaterialCommunityIcons
                  name='credit-card'
                  size={24}
                  color='#333'
                />
              )}
              <Text>{getPaymentType(activeOrder?.paymaent_type, true)}</Text>
            </Flex>
            <Gap />
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
  },
  infoBtn: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 24,
  },
});

export default memo(OrderSuccess);
