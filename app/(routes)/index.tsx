import React, { FC, memo } from 'react';
import { View } from 'react-native';

import {
  CategoryBlock,
  ConfirmAddress,
  Flex,
  Gap,
  Header,
  Layout,
  RestPromotions,
} from '@/components';
import { ActiveOrder, useOrder } from '@/widgets/order';
import { useRestaurant } from '@/widgets/restaurants';

const HomeScreen: FC = () => {
  const { orderLoading } = useOrder();
  const { restaurants } = useRestaurant();

  return (
    <Layout loading={orderLoading}>
      <ConfirmAddress />
      <Header />
      <ActiveOrder />
      <Gap />
      <RestPromotions />
      <Flex>
        <CategoryBlock
          route='restaurants'
          text='Рестораны'
          url='restaurants'
          size={2}
        />
        <View>
          <CategoryBlock route='shops' text='Магазины' url='shops' size={1} />
          <CategoryBlock
            route='restaurants'
            text='Предложения'
            url='offers'
            size={1}
          />
        </View>
      </Flex>
      <Gap />
      <Flex gap={12} justify='space-around'>
        <CategoryBlock route='restaurants' text='Комбо' url='kombo' />
        <CategoryBlock route='restaurants' text='<35 мин.' url='fastdelivery' />
        {restaurants[0]?.name && (
          <CategoryBlock
            route={`restaurants/[id]`}
            text={restaurants[0]?.name}
            url='sponsor1'
            params={{ id: restaurants[0]?.id }}
          />
        )}
        {restaurants[1]?.name && (
          <CategoryBlock
            route={`restaurants/[id]`}
            text={restaurants[1]?.name}
            params={{ id: restaurants[1]?.id }}
            url='sponsor2'
          />
        )}
      </Flex>
    </Layout>
  );
};

export default memo(HomeScreen);
