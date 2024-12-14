import { Flex, Text } from '@/components';
import React, { FC, memo, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICollection } from '../types';
import { IRestaurant, useRestaurant } from '@/widgets/restaurants';
import { supabaseBucketImg } from '@/global';
import { useThemeColor } from '@/hooks';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface IProps {
  collection: ICollection;
}

const imgSize = 100;

const CollectionItem: FC<IProps> = ({ collection }) => {
  const { restaurants } = useRestaurant();
  const bgColor = useThemeColor('cardBg');

  const restaurantsInCollection = useMemo(() => {
    const result: IRestaurant[] = [];

    restaurants.forEach((rest) => {
      if (collection?.rest_ids.includes(+rest.id)) {
        result.push(rest);
      }
    });

    return result;
  }, [restaurants, collection?.rest_ids]);

  const onPressCollection = () => {
    router.push({
      pathname: '/(routes)/collections/[id]',
      params: { col: JSON.stringify(collection) },
    });
  };

  return (
    <TouchableOpacity onPress={onPressCollection}>
      <Flex>
        {restaurantsInCollection[0]?.public_id ? (
          <Image
            source={{
              uri:
                supabaseBucketImg +
                `restaurants/${restaurantsInCollection[0]?.public_id}.${restaurantsInCollection[0]?.preview}`,
            }}
            style={styles.img}
          />
        ) : (
          <View
            style={[styles.fakeImage, styles.img, { backgroundColor: bgColor }]}
          >
            <Feather
              style={{ textAlign: 'center' }}
              name='bookmark'
              size={24}
              color='black'
            />
          </View>
        )}
        <View>
          <Text>{collection?.title}</Text>
          <Text style={styles.text}>
            {collection?.want_to === 'go' ? 'Место' : 'Заказ'} •{' '}
            {restaurantsInCollection.length === 0
              ? 'Ничего не сохранено'
              : restaurantsInCollection.length + ' сохранено'}
          </Text>
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fakeImage: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
  img: {
    width: imgSize,
    height: imgSize,
  },
});

export default memo(CollectionItem);
