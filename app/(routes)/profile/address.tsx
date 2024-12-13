import React, { FC, memo, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { LocationGeocodedAddress } from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import {
  Button,
  Flex,
  Gap,
  Layout,
  MiniHeader,
  Text,
  UpdateAddressModal,
} from '@/components';
import { IAddress, IDelivery, useDelivery } from '@/widgets/delivery';

const Address: FC = () => {
  const addressFromMapAsString = useLocalSearchParams()?.address;
  const updateModalRef = useRef<BottomSheet>(null);
  const { delivery, onUpdateDelivery, deliveryLoading } = useDelivery();

  const [activeAddress, setActiveAddress] = useState<IAddress | null>(null);

  const addressFromMap: LocationGeocodedAddress = useMemo(() => {
    if (addressFromMapAsString)
      return JSON.parse(addressFromMapAsString as string);
    return '';
  }, [addressFromMapAsString]);

  const canDeleteAddress = useMemo(
    () => (delivery?.adresses.length ?? 0) > 1,
    [delivery?.adresses]
  );

  const onPressChooseAddress = () => {
    router.push('/(routes)/map');
  };

  const onPressDeleteAddress = async (id: string) => {
    if (delivery?.adresses) {
      await onUpdateDelivery({
        adresses: [...delivery?.adresses].filter((item) => item.id !== id),
      } as IDelivery);
    }
  };

  return (
    <Layout loading={deliveryLoading}>
      <MiniHeader title='Адреса' />
      <Gap />
      <View style={{ flex: 1 }}>
        {(delivery?.adresses?.length ?? 0) > 0 && (
          <>
            <Text title>Ваши адреса</Text>
            <Gap />
            <FlatList
              data={delivery?.adresses}
              renderItem={({ item }) => (
                <Flex justify='space-between'>
                  <Text style={{ color: 'grey' }} key={item.id}>
                    {item?.address}, {item.name}{' '}
                    {item.id === 'no_id' && '(временный)'}
                  </Text>
                  <AntDesign
                    name='delete'
                    disabled={!canDeleteAddress}
                    onPress={() => onPressDeleteAddress(item.id)}
                    size={18}
                    color={!canDeleteAddress ? 'grey' : 'black'}
                  />
                </Flex>
              )}
            />
          </>
        )}
        {addressFromMap && (
          <>
            <Text title>Новый адресс</Text>
            <Text>{addressFromMap?.formattedAddress}</Text>
            <Gap />
          </>
        )}
      </View>
      <Flex toDown>
        <Button full btnProps={{ onPress: onPressChooseAddress }}>
          Выбрать {addressFromMap ? 'ещё раз' : 'новый'}
        </Button>
      </Flex>
      {addressFromMap && (
        <>
          <Button
            type='primary'
            btnProps={{ onPress: () => updateModalRef.current?.snapToIndex(0) }}
          >
            Детали нового адреса
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
          <Gap />
        </>
      )}
    </Layout>
  );
};

export default memo(Address);
