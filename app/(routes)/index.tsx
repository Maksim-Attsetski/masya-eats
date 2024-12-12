import React, { FC, memo } from 'react';

import {
  ConfirmAddress,
  Gap,
  Header,
  Layout,
  ListWithInput,
  Text,
} from '@/components';
import { ActiveOrder, useOrder } from '@/widgets/order';
import { RestaurantItem, useRestaurant } from '@/widgets/restaurants';

const HomeScreen: FC = () => {
  const { restaurants, restaurantsLoading, onGetRestaurants } = useRestaurant();
  const { orderLoading } = useOrder();

  return (
    <Layout loading={orderLoading || orderLoading}>
      <ConfirmAddress />
      <Header />
      <ActiveOrder />
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

export default memo(HomeScreen);
