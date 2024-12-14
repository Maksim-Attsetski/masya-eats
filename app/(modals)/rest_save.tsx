import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { IRestaurant } from '@/widgets/restaurants';
import {
  Button,
  Flex,
  Gap,
  Input,
  Layout,
  MiniHeader,
  Text,
} from '@/components';
import { ICollection, TWantTo, useCollection } from '@/widgets/collections';
import { getItemFromParams, useThemeColor } from '@/hooks';
import { useAuth } from '@/widgets';

const RestSave: FC = () => {
  const item = useLocalSearchParams()?.item as string;
  const col = useLocalSearchParams()?.col as string;

  const { onAddCollection, onEditCollection } = useCollection();
  const { user } = useAuth();
  const bgColor = useThemeColor('cardBg');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wantTo, setWantTo] = useState<TWantTo>('order');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const rest: IRestaurant | null = useMemo(
    () => getItemFromParams(item),
    [item]
  );
  const collection: ICollection | null = useMemo(
    () => getItemFromParams(col),
    [col]
  );

  const saveBtnDisabled: boolean = useMemo(
    () => title.length < 2 || title.length > 30 || wantTo === 'go',
    [title, wantTo]
  );

  const onPressSave = async () => {
    if (!user?.id) return;

    const newCollection = {
      title,
      description,
      want_to: wantTo,
      is_visible: isVisible,
    } as ICollection;

    if (collection) {
      const editedCol = { ...collection, ...newCollection };
      await onEditCollection(editedCol);
      router.replace({
        pathname: '/(routes)/collections/[id]',
        params: { col: JSON.stringify(editedCol) },
      });
    } else {
      await onAddCollection({ ...newCollection, user_id: user?.id });
      router.back();
    }
  };

  useEffect(() => {
    if (collection) {
      setTitle(collection?.title);
      setDescription(collection?.description);
    }
  }, [collection]);

  return (
    <Layout>
      <>
        <MiniHeader
          title={collection ? 'Редактировать коллекцию' : 'Новая коллекция'}
        />
        <Gap />
        <Input
          title='Название'
          inputProps={{ value: title, onChangeText: setTitle, maxLength: 30 }}
        />
        <Gap />
        <Input
          title='Описание'
          inputProps={{
            value: description,
            onChangeText: setDescription,
            maxLength: 200,
          }}
        />

        <Gap y={20} />
        <View>
          <TouchableOpacity onPress={() => setWantTo('order')}>
            <Flex justify='space-between'>
              <Flex>
                <MaterialCommunityIcons
                  name='truck-delivery'
                  size={24}
                  style={[styles.icon, { backgroundColor: bgColor }]}
                  color='black'
                />
                <Text>Я хочу это заказать</Text>
              </Flex>
              <Ionicons
                name={
                  wantTo === 'order'
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                size={30}
                color='black'
              />
            </Flex>
          </TouchableOpacity>
          <Gap />
          <TouchableOpacity disabled={!!rest} onPress={() => setWantTo('go')}>
            <Flex justify='space-between'>
              <Flex>
                <MaterialIcons
                  name='route'
                  size={24}
                  style={[styles.icon, { backgroundColor: bgColor }]}
                  color='black'
                />
                <Text>Я хочу туда пойти</Text>
              </Flex>
              <Ionicons
                name={
                  wantTo === 'go'
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                size={30}
                color='black'
              />
            </Flex>
          </TouchableOpacity>
        </View>
        <Gap y={24} />
        <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
          <Flex justify='space-between'>
            <Text>Видно другим пользователям</Text>
            <Ionicons
              name={isVisible ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={40}
              color='black'
            />
          </Flex>
        </TouchableOpacity>
        <Flex toDown>
          <Button
            full
            type='primary'
            btnProps={{ disabled: saveBtnDisabled, onPress: onPressSave }}
          >
            Сохранить
          </Button>
        </Flex>
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 18,
    borderRadius: 8,
  },
});

export default memo(RestSave);
