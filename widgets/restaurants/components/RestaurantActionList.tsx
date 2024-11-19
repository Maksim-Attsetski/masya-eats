import React, { FC, memo, useMemo } from 'react';
import { IRestaurant, RestaurantAction } from '../';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerPadding,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  supabaseBucketImg,
} from '@/global';
import { Button, Flex, Gap, MiniHeader, Text } from '@/components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
interface IProps {
  item: IRestaurant;
}

{
  /* <FlatList>
  
</FlatList> */
}
const RestaurantActionList: FC<IProps> = ({ item }) => {
  const dataForActions = [
    {
      title: `${item?.delivery_time[0]} - ${item?.delivery_time[1]} мин`,
      content: ['Доставка', `0 - ${item?.delivery_cost} Br`],
      children: undefined,
    },
    {
      title: item.rating?.length + '',
      content: [`${item.rating?.length} оценок`, 'Круто'],
      children: <AntDesign name='star' size={14} color='black' />,
    },
    {
      title: '',
      content: ['Читать больше', '  '],
      children: <AntDesign name='infocirlceo' size={24} color='black' />,
    },
    {
      title: '',
      content: ['Сохранить', '  '],
      children: (
        <MaterialCommunityIcons
          name='bookmark-outline'
          size={24}
          color='black'
        />
      ),
    },
    {
      title: '',
      content: ['Поделиться', '  '],
      children: <AntDesign name='sharealt' size={24} color='black' />,
    },
  ];
  return (
    <FlatList
      horizontal
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      data={dataForActions}
      style={{ padding: 12 }}
      renderItem={({ item }) => <RestaurantAction {...item} />}
      ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
    />
  );
};

export default memo(RestaurantActionList);
