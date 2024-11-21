import {
  Button,
  Divider,
  Gap,
  Layout,
  MiniHeader,
  Text,
  UpdateAddressModal,
} from '@/components';
import { useDelivery } from '@/widgets/delivery';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { LocationGeocodedAddress } from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import React, { FC, memo, useMemo, useRef } from 'react';
import { View } from 'react-native';

const UpdateAddress: FC = () => {
  const addressFromMapAsString = useLocalSearchParams()?.address;
  const updateModalRef = useRef<BottomSheet>(null);
  const { delivery, onUpdateDelivery } = useDelivery();

  const addressFromMap: LocationGeocodedAddress = useMemo(() => {
    if (addressFromMapAsString)
      return JSON.parse(addressFromMapAsString as string);
    return '';
  }, [addressFromMapAsString]);

  const onPressChooseAddress = () => {
    router.push('/(routes)/map');
  };

  const onSaveAddress = async () => {
    console.log('updated!');

    // await onUpdateDelivery({
    //   adresses: [
    //     {
    //       address: 'Ул. Братская',
    //       apartment: 0,
    //       door_phone: 0,
    //       entrance: 0,
    //       floor: 0,
    //       id: 'cfmweofni23oi',
    //       instruction: '',
    //       main: true,
    //       name: 'Дом',
    //     },
    //   ],
    //   promo_codes: [],
    //   orderTime: 'ASAP',
    // });
  };

  return (
    <Layout>
      <MiniHeader title='Адреса' />
      <Gap />
      <View>
        <Text>Здесь указаны ваши адреса</Text>
        <Text>{JSON.stringify(delivery)}</Text>

        <Divider />
        {addressFromMap && (
          <>
            <Text title>Новый адресс</Text>
            <Text>{addressFromMap?.formattedAddress}</Text>
          </>
        )}

        <Divider />

        {delivery?.adresses?.map((address) => (
          <Text>
            {address?.address}, {address.name}, {address.id}
          </Text>
        ))}

        <Divider />

        <Button type='primary' btnProps={{ onPress: onPressChooseAddress }}>
          Выбрать
        </Button>
        <Button
          type='primary'
          btnProps={{ onPress: () => updateModalRef.current?.snapToIndex(0) }}
        >
          Обновить
        </Button>
      </View>
      {addressFromMap && (
        <UpdateAddressModal
          initialAddress={{
            address: addressFromMap?.street ?? '',
            apartment: '',
            door_phone: '',
            entrance: '',
            floor: '',
            id: 'no_id',
            instruction: '',
            main: false,
            name: addressFromMap?.streetNumber + '',
          }}
          fromMap
          bottomSheetRef={updateModalRef}
        />
      )}
    </Layout>
  );
};

export default memo(UpdateAddress);
