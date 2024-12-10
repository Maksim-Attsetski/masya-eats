import React, { FC, memo, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import {
  ConfirmAddress,
  Gap,
  Header,
  Layout,
  ListWithInput,
  Text,
} from '@/components';
import { Colors, ContainerPadding } from '@/global';
import { useOrder } from '@/widgets/order';
import { RestaurantItem, useRestaurant } from '@/widgets/restaurants';
import { router } from 'expo-router';

const HomeScreen: FC = () => {
  const { restaurants, restaurantsLoading, onGetRestaurants } = useRestaurant();
  const { orders, orderLoading } = useOrder();

  const activeOrder = useMemo(
    () => orders.find((o) => o.created_at) ?? orders[0],
    [orders]
  );

  return (
    <Layout loading={orderLoading || orderLoading}>
      <ConfirmAddress />
      <Header />
      {activeOrder && (
        <TouchableOpacity
          onPress={() => router.push('/(routes)/order-success')}
          style={styles.order}
        >
          <Text title center>
            Активный заказ №{activeOrder?.public_id}
          </Text>
        </TouchableOpacity>
      )}
      <Text title>Рестораны</Text>
      <Gap />
      <Text>Мы думаем они худшие. Сделайте заказ и проверьте это</Text>
      <Gap />
      <ListWithInput
        data={restaurants}
        inputPlaceholder='Поиск'
        limitForInput={2}
        renderItem={(item) => <RestaurantItem item={item} />}
        onSearch={onGetRestaurants}
        onRefresh={onGetRestaurants}
        loading={restaurantsLoading}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  order: {
    paddingHorizontal: ContainerPadding,
    paddingVertical: 16,
    backgroundColor: Colors.light.cardBg,
    borderRadius: 16,
    marginVertical: 12,
  },
});

export default memo(HomeScreen);
