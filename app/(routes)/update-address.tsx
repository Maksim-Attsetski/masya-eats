import React, { FC, memo, useMemo, useRef } from 'react';
import { View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { LocationGeocodedAddress } from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';

import {
  Button,
  Divider,
  Flex,
  Gap,
  Layout,
  MiniHeader,
  Text,
  UpdateAddressModal,
} from '@/components';
import { useDelivery } from '@/widgets/delivery';

const UpdateAddress: FC = () => {
  const addressFromMapAsString = useLocalSearchParams()?.address;
  const updateModalRef = useRef<BottomSheet>(null);
  const { delivery } = useDelivery();

  const addressFromMap: LocationGeocodedAddress = useMemo(() => {
    if (addressFromMapAsString)
      return JSON.parse(addressFromMapAsString as string);
    return '';
  }, [addressFromMapAsString]);

  const onPressChooseAddress = () => {
    router.push('/(routes)/map');
  };

  return (
    <Layout>
      <MiniHeader title='Адреса' />
      <Gap />
      <View style={{ flex: 1 }}>
        <Text>{JSON.stringify(delivery)}</Text>
        <Divider />

        {addressFromMap && (
          <>
            <Text title>Новый адресс</Text>
            <Text>{addressFromMap?.formattedAddress}</Text>
            <Divider />
          </>
        )}

        {(delivery?.adresses?.length ?? 0) > 0 && (
          <>
            <Text title>Ваши адреса</Text>
            <Gap />
            {delivery?.adresses?.map((address) => (
              <Text style={{ color: 'grey' }} key={address.id}>
                {address?.address}, {address.name}, {address.id}
              </Text>
            ))}
            <Divider />
          </>
        )}

        <Flex toDown>
          <Button full btnProps={{ onPress: onPressChooseAddress }}>
            Выбрать новый
          </Button>
        </Flex>
      </View>
      {addressFromMap && (
        <>
          <Gap />
          <Button
            type='primary'
            btnProps={{ onPress: () => updateModalRef.current?.snapToIndex(0) }}
          >
            Обновить
          </Button>
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
        </>
      )}
    </Layout>
  );
};

export default memo(UpdateAddress);
