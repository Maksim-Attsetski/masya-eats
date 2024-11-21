import { Button, Divider, Gap, Layout, MiniHeader, Text } from '@/components';
import { useDelivery } from '@/widgets/delivery';
import React, { FC, memo } from 'react';
import { View } from 'react-native';

const UpdateAddress: FC = () => {
  const { delivery, onUpdateDelivery } = useDelivery();

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
        <Text title>{delivery?.adresses?.[0]?.name}</Text>
        <Text>{delivery?.adresses?.[0]?.address}</Text>
        <Divider />

        <Button type='primary' btnProps={{ onPress: onSaveAddress }}>
          Обновить
        </Button>
      </View>
    </Layout>
  );
};

export default memo(UpdateAddress);
