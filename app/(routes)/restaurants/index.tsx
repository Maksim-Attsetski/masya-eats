import React, { FC, memo } from 'react';

import { LayoutWithAnimatedHeader, ListWithInput, Text } from '@/components';
import { useOrder } from '@/widgets/order';
import { RestaurantItem, useRestaurant } from '@/widgets/restaurants';

const RestaurantsScreen: FC = () => {
  const { restaurants, restaurantsLoading, onGetRestaurants } = useRestaurant();
  const { orderLoading } = useOrder();

  return (
    <LayoutWithAnimatedHeader
      title='Рестораны'
      loading={restaurantsLoading || orderLoading}
    >
      <Text>Мы думаем они худшие. Сделайте заказ и проверьте это</Text>
      <ListWithInput
        data={restaurants}
        inputPlaceholder='Поиск'
        limitForInput={2}
        renderItem={(item) => <RestaurantItem item={item} />}
        onSearch={onGetRestaurants}
        onRefresh={onGetRestaurants}
        loading={restaurantsLoading}
      />
    </LayoutWithAnimatedHeader>
  );
};

export default memo(RestaurantsScreen);
