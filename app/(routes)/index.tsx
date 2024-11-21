import { ConfirmAddress, Gap, Header, Layout, Text } from '@/components';
import { RestaurantItem, useRestaurant } from '@/widgets/restaurants';
import React, { FC, memo, useEffect } from 'react';
import { FlatList } from 'react-native';

const HomeScreen: FC = () => {
  const { onGetRestaurants, restaurants, restaurantsLoading } = useRestaurant();

  useEffect(() => {
    onGetRestaurants();
  }, []);

  return (
    <Layout>
      <ConfirmAddress />
      <Header />
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

export default memo(HomeScreen);
