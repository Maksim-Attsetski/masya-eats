import React, { FC, memo, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { ConfirmAddress, Gap, Header, Layout, Text } from '@/components';
import { Colors, ContainerPadding } from '@/global';
import { useOrder } from '@/widgets/order';
import { RestaurantItem, useRestaurant } from '@/widgets/restaurants';
import { router } from 'expo-router';

const HomeScreen: FC = () => {
  const { onGetRestaurants, restaurants, restaurantsLoading } = useRestaurant();
  const { orders, onGetOrders } = useOrder();

  const activeOrder = useMemo(
    () => orders.find((o) => o.created_at) ?? orders[0],
    [orders]
  );

  useEffect(() => {
    onGetOrders();
    onGetRestaurants();
  }, []);

  return (
    <Layout>
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
      <FlatList
        ListHeaderComponent={
          <>
            <Text title>Рестораны</Text>
            <Gap />
            <Text>Мы думаем они худшие. Сделайте заказ и проверьте</Text>
            <Gap />
          </>
        }
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem item={item} />}
        refreshing={restaurantsLoading}
        ListEmptyComponent={
          <>
            <Text>Пусто</Text>
          </>
        }
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
