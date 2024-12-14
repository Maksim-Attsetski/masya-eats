import React, { FC, memo, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Gap, LayoutWithAnimatedHeader, Text } from '@/components';
import { useOrder } from '@/widgets/order';
import {
  IRestaurant,
  RestaurantItem,
  useRestaurant,
} from '@/widgets/restaurants';
import Empty from '@/components/ui/Empty';

interface IParams {
  restaurants: IRestaurant[];
  title: string;
  description: string;
}

const RestaurantsScreen: FC = () => {
  const params = useLocalSearchParams();

  const { restaurants, restaurantsLoading } = useRestaurant();
  const { orderLoading } = useOrder();

  const parseParams: IParams = useMemo(() => {
    const parsedData = params?.restaurants
      ? {
          restaurants: JSON.parse(params?.restaurants as string),
          title: params?.title as string,
          description: params?.description as string,
        }
      : {};

    return {
      restaurants: parsedData?.restaurants ?? restaurants,
      title: parsedData?.title ?? 'Рестораны',
      description:
        parsedData?.description ??
        'Мы думаем они худшие. Сделайте заказ и проверьте это',
    };
  }, [params, restaurants]);

  return (
    <LayoutWithAnimatedHeader
      title={parseParams.title}
      loading={restaurantsLoading || orderLoading}
    >
      <Text style={{ fontSize: 14 }}>{parseParams.description}</Text>
      <Gap />
      <FlatList
        data={parseParams.restaurants}
        scrollEnabled={false}
        renderItem={({ item }) => <RestaurantItem full item={item} />}
        refreshing={restaurantsLoading}
        ItemSeparatorComponent={() => <Gap />}
        ListEmptyComponent={<Empty />}
      />
      <Gap />
    </LayoutWithAnimatedHeader>
  );
};

export default memo(RestaurantsScreen);
