import React, { FC, memo, useMemo } from 'react';
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
import { SortedRestBlock, useRestaurant } from '@/widgets/restaurants';

const HomeScreen: FC = () => {
  const { orderLoading } = useOrder();
  const { restaurants } = useRestaurant();

  return (
    <Layout scrollable loading={orderLoading}>
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
      <Gap />
      <SortedRestBlock small title='Популярные рестораны' />
      <SortedRestBlock
        title='Бургеры'
        description='Найти тот самый бургер — задача не из простых. Но мы поможем: собрали рестораны, 
        где их можно заказать. Осталось попробовать и выбрать лучший'
        filterBy={(a) => a.tags.includes('Бургеры')}
      />
      <SortedRestBlock
        title='С высоким рейтингом'
        description='От бургеров и салатов до затейлевых десертов — что бы ни готовили в этих
        ресторанах, результат всегда отличный. Встречайте подборку мест с самыми высокими оценками публики'
      />
      <SortedRestBlock
        title='Доставка 0 Br'
        filterBy={(item) => item.delivery_cost === 0}
        description='В этих ресторанах можно сделать сделать заказ и не платить за доставку. Посмотрите, что есть рядом с вами'
      />
      <Gap />
    </Layout>
  );
};

export default memo(HomeScreen);
