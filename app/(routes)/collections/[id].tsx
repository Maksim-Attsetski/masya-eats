import {
  Divider,
  Gap,
  Layout,
  LayoutWithAnimatedHeader,
  Text,
} from '@/components';
import { getItemFromParams } from '@/hooks';
import { ICollection } from '@/widgets/collections';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { FC, memo, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

const CollectionItem: FC = () => {
  const col = useLocalSearchParams()?.col as string;

  const collection: ICollection | null = useMemo(
    () => getItemFromParams<ICollection>(col) ?? null,
    [col]
  );

  return (
    <LayoutWithAnimatedHeader
      right={
        <TouchableOpacity
          style={{ marginTop: 12 }}
          onPress={() =>
            router.push({
              pathname: '/(modals)/rest_save',
              params: { col: JSON.stringify(collection) },
            })
          }
        >
          <MaterialIcons name='mode-edit' size={24} color='black' />
        </TouchableOpacity>
      }
      onLeftPress={() => router.replace('/(routes)/profile/collections')}
      title={collection?.title ?? 'Без названия'}
    >
      {(collection?.description.length ?? 0) > 0 && (
        <>
          <Text>{collection?.description}</Text>
          <Divider />
        </>
      )}
      <Text>Видно другим юзерам: {collection?.is_visible ? 'да' : 'нет'}</Text>
      <Text>Тип: {collection?.want_to === 'go' ? 'Пойти' : 'Заказать'}</Text>

      <Gap />
      <Text>Сохранено</Text>
      <Text>{collection?.rest_ids?.length ?? 0}</Text>
    </LayoutWithAnimatedHeader>
  );
};

export default memo(CollectionItem);
