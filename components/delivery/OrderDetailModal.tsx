import React, { FC, memo, useMemo, useRef } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import BottomSheet, {
  BottomSheetView,
  SCREEN_WIDTH,
} from '@gorhom/bottom-sheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button, Flex, Gap, Text } from '../ui';
import { IRestaurant } from '@/widgets/restaurants';
import { ContainerPadding, staticColors } from '@/global';
import { IDelivery, useBin, useDelivery } from '@/widgets/delivery';
import { IRestaurantOffer, useRestOffers } from '@/widgets/restaurant-offer';
import { IOrder, useOrder } from '@/widgets/order';
import { getAddress } from '@/hooks';
import { useAuth } from '@/widgets';
import { PleaseLogin } from '../modals';

interface IProps {
  restaurant?: IRestaurant;
  final?: boolean;
}

const OrderDetailModal: FC<IProps> = ({ restaurant, final = false }) => {
  const { onUpdateDelivery, delivery } = useDelivery();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const loginBottomSheetRef = useRef<BottomSheet>(null);

  const { bin } = useBin();
  const { user } = useAuth();
  const { onAddOrder } = useOrder();
  const { restOffers } = useRestOffers();

  const orderPrice: number = useMemo(() => {
    const offersAsObj: { [key: string]: IRestaurantOffer } = {};

    restOffers.forEach((item) => {
      offersAsObj[item?.id] = item;
    });

    return (
      bin?.reduce((a, b) => a + b.count * offersAsObj[b.offer_id]?.price, 0) ??
      0
    );
  }, [bin, restOffers]);

  const myAddress = useMemo(() => {
    const adress =
      delivery?.adresses.find((addr) => addr.main) ?? delivery?.adresses[0];
    return adress;
  }, [delivery?.adresses]);

  const onPressConfirmOrder = async () => {
    if (!user?.id) {
      loginBottomSheetRef.current?.snapToIndex(0);
      return;
    }

    if (final && restaurant) {
      await onUpdateDelivery({
        from: restaurant?.locations[0].address,
      } as IDelivery);
      await onAddOrder({
        delivery_time: restaurant?.delivery_time[1],
        discount: 0,
        from: restaurant?.locations[0].address,
        to: getAddress(myAddress?.address, myAddress?.apartment),
        paymaent_type: 'cash',
        price: orderPrice,
        products: bin,
        progress: 0,
        user_id: user?.id,
      } as IOrder);
    }
    router.push({
      // @ts-ignore
      pathname: '/(routes)/order' + (final ? '-success' : ''),
      params: { rest: JSON.stringify(restaurant) },
    });
  };

  return (
    <>
      <Animated.View entering={FadeInDown}>
        <TouchableHighlight
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            paddingHorizontal: ContainerPadding,
            paddingVertical: 12,
            width: SCREEN_WIDTH - 1,
          }}
          underlayColor={'rgb(245,245,245)'}
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        >
          <>
            <Flex justify='space-between'>
              <MaterialCommunityIcons
                name='truck-delivery'
                size={24}
                color='black'
              />
              <Text
                style={{ fontSize: 14, color: staticColors.primary.bg }}
                center
              >
                Доставка {orderPrice >= 20 ? 0 : 7}
                {' Br'}
              </Text>
              <MaterialIcons
                name='keyboard-arrow-right'
                size={24}
                color='black'
              />
            </Flex>
            <Gap />
            <Button
              btnProps={{
                onPress: onPressConfirmOrder,
              }}
              type='primary'
            >
              <Flex justify='space-between' style={{ width: '80%' }}>
                <Text style={styles.whiteText}>20-30 мин</Text>
                <Text style={styles.whiteText}>Продолжить</Text>
                <Text style={styles.whiteText}>{orderPrice} Br</Text>
              </Flex>
            </Button>
          </>
        </TouchableHighlight>
      </Animated.View>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enableDynamicSizing
        enablePanDownToClose
      >
        <BottomSheetView style={styles.bottomSheet}>
          <Text style={styles.title}>Цена доставки</Text>
          <Gap y={22} />
          <Text title>Доставляется партнерами Masya Eats</Text>
          <Gap />
          <Text style={styles.grey}>
            Цена понижается за каждый Br в вашей корзине
          </Text>
          <Gap />
          <Flex justify='space-between'>
            <Text style={styles.grey}>Заказ выше 20 Br</Text>
            <Text>0 Br</Text>
          </Flex>
          <Gap />
          <Flex justify='space-between'>
            <Text style={styles.grey}>Заказ выше 200 Br</Text>
            <Text>0 Br</Text>
          </Flex>
          <Gap />
          <Gap />
          <Text style={styles.title}>Детали</Text>
          <Gap y={22} />
          <Flex justify='space-between'>
            <Text style={styles.subText}>Максимальный вес доставки</Text>
            <Text>45 Кг</Text>
          </Flex>
          <Gap />
          <Flex justify='space-between'>
            <Text style={styles.subText}>Плата за обслуживание</Text>
            <Text>0.99 Br</Text>
          </Flex>
          <Gap />
          <Text style={styles.subText}>
            Ассортименты и предложения партнеров, которые вы можете увидеть в
            Masya Eats, размещены бесплатно.
          </Text>
          <Text style={styles.subText}>
            Оплата за обслуживание это плата за размещение заказов в Masya Eats.
            Нажимая кнопку "Продолжить", вы соглашаетесь с условиями.
          </Text>
        </BottomSheetView>
      </BottomSheet>
      <PleaseLogin bottomSheetRef={loginBottomSheetRef} />
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    paddingHorizontal: ContainerPadding,
    paddingVertical: 12,
    zIndex: 9999999,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  grey: {
    color: 'grey',
    fontSize: 14,
  },
  subText: {
    fontSize: 12,
    color: 'grey',
  },
  whiteText: {
    color: 'white',
  },
});

export default memo(OrderDetailModal);
