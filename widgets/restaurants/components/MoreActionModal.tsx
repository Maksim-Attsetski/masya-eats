import React, { FC, memo } from 'react';
import { FlatList } from 'react-native';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { IRestaurant, RestaurantAction } from '../';
import { Gap } from '@/components';

interface IProps {
  item: IRestaurant;
  onPressMore?: () => void;
  onPressSave?: () => void;
}

const MoreActionModal: FC<IProps> = ({
  item,
  onPressMore = () => {},
  onPressSave = () => {},
}) => {
  const dataForActions = [
    {
      title: `${item?.delivery_time[0]} - ${item?.delivery_time[1]} мин`,
      content: ['Доставка', `0 - ${item?.delivery_cost} Br`],
      children: undefined,
      onPress: () => {},
    },
    {
      title: item.rating?.length + '',
      content: [`${item.rating?.length} оценок`, 'Круто'],
      children: <AntDesign name='star' size={14} color='black' />,
      onPress: () => {},
    },
    {
      title: '',
      content: ['Читать больше', '  '],
      children: <AntDesign name='infocirlceo' size={24} color='black' />,
      onPress: onPressMore,
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
      onPress: onPressSave,
    },
    {
      title: '',
      content: ['Поделиться', '  '],
      children: <AntDesign name='sharealt' size={24} color='black' />,
      onPress: () => {},
    },
  ];

  return (
    <>
      <FlatList
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        data={dataForActions}
        style={{ padding: 12 }}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => <RestaurantAction {...item} />}
        ItemSeparatorComponent={() => <Gap x={8} />}
      />
    </>
  );
};

export default memo(MoreActionModal);
