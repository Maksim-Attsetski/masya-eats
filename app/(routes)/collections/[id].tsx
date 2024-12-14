import {
  AreYouRight,
  Button,
  Divider,
  Flex,
  Gap,
  Layout,
  LayoutWithAnimatedHeader,
  Text,
} from '@/components';
import { getItemFromParams } from '@/hooks';
import { ICollection, useCollection } from '@/widgets/collections';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import React, { FC, memo, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CollectionItem: FC = () => {
  const col = useLocalSearchParams()?.col as string;

  const { onDeleteCollection } = useCollection();

  const bottomSheetRef = useRef<BottomSheet>(null);

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
      <>
        <Button
          size='small'
          type='secondary'
          btnProps={{ onPress: () => bottomSheetRef.current?.snapToIndex(0) }}
        >
          Удалить
        </Button>
        <Gap />
        {(collection?.description.length ?? 0) > 0 && (
          <>
            <Text>{collection?.description}</Text>
            <Divider />
          </>
        )}
        <Text>
          Видно другим юзерам: {collection?.is_visible ? 'да' : 'нет'}
        </Text>
        <Text>Тип: {collection?.want_to === 'go' ? 'Пойти' : 'Заказать'}</Text>

        <Gap />
        <Text>Сохранено</Text>
        <Text>{collection?.rest_ids?.length ?? 0}</Text>
        <AreYouRight
          bottomSheetRef={bottomSheetRef}
          onConfirm={() => collection && onDeleteCollection(collection?.id)}
          text={`Удалить коллекцию "${collection?.title}"`}
        />
      </>
    </LayoutWithAnimatedHeader>
  );
};

export default memo(CollectionItem);
