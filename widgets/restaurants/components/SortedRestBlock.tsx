import React, { FC, memo, useMemo } from 'react';
import { useRestaurant } from '../useRestaurant';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Flex, Gap, Text } from '@/components';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import {
  Colors,
  ContainerPadding,
  SCREEN_WIDTH,
  staticColors,
  supabaseBucketImg,
} from '@/global';
import { IRestaurant, IRestaurantWithRating } from '../types';
import { router } from 'expo-router';

const imgHeight = 70;
const imgWidth = SCREEN_WIDTH / 3 - ContainerPadding;
const bigImgWidth = SCREEN_WIDTH * 0.65;

interface IProps {
  small?: boolean;
  sortBy?: (a: IRestaurantWithRating, b: IRestaurantWithRating) => number;
  filterBy?: (a: IRestaurantWithRating, inx: number) => boolean;
  toRender?: number;
  title: string;
  description?: string;
}

const toString = (data: any): string => JSON.stringify(data);

const SortedRestBlock: FC<IProps> = ({
  small = false,
  toRender = 20,
  title,
  description,
  sortBy,
  filterBy,
}) => {
  const { restaurants } = useRestaurant();

  const filteredRestaurants = useMemo(() => {
    let restsWithRating: IRestaurantWithRating[] = restaurants.map((rest) => {
      return {
        ...rest,
        rating:
          (rest.rating?.length ?? 0) > 0
            ? rest.rating?.reduce((prev, cur) => prev + cur.rate, 0)
            : 0,
      } as IRestaurantWithRating;
    });

    if (filterBy && sortBy) {
      return restsWithRating.filter(filterBy ?? (() => true)).sort(sortBy);
    }
    if (filterBy) {
      return restsWithRating.filter(filterBy ?? (() => true));
    }
    if (sortBy) {
      return restsWithRating.sort(sortBy);
    }
    return restsWithRating;
  }, [restaurants, filterBy, sortBy]);

  const filteredRestaurantsForRender = useMemo(
    () => filteredRestaurants.slice(0, 5),
    [filteredRestaurants]
  );

  const onPressAll = () => {
    router.push({
      pathname: '/(routes)/restaurants',
      params: {
        restaurants: toString(filteredRestaurants.slice(0, toRender)),
        title,
        description,
      },
    });
  };

  return (
    filteredRestaurantsForRender.length > 0 && (
      <View>
        <Gap />
        <Flex justify='space-between'>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.btn} onPress={onPressAll}>
            <Text style={styles.btnText}>Все</Text>
            <AntDesign name='right' size={14} color='black' />
          </TouchableOpacity>
        </Flex>

        <Gap />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredRestaurantsForRender}
          ItemSeparatorComponent={() => <Gap x={ContainerPadding} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/(routes)/restaurants/[id]',
                  params: { id: item.id },
                })
              }
            >
              <Image
                source={{
                  uri:
                    supabaseBucketImg +
                    `restaurants/${item?.public_id}.${item?.preview}`,
                }}
                style={styles[small ? 'restImage' : 'restBigImage']}
              />
              <Gap y={4} />
              {!small && (
                <Flex justify='space-between'>
                  <Text style={styles.restText}>{item.name}</Text>
                  <Flex gap={4}>
                    <AntDesign name='star' size={12} color='black' />
                    <Text style={styles.restRating}>{item.rating}</Text>
                  </Flex>
                </Flex>
              )}
              <Text style={styles.restDelivery}>
                {item.delivery_time[0]} - {item.delivery_time[1]} мин.
              </Text>

              {!small && (
                <Flex>
                  {item.promotions.map((promo) => (
                    <Text key={promo.title} style={styles.restPromo}>
                      {promo.title} — {promo.description}
                    </Text>
                  ))}
                </Flex>
              )}
            </TouchableOpacity>
          )}
        />
        <Gap />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 900,
  },
  btn: {
    backgroundColor: Colors.light.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -4,
  },
  btnText: {
    fontSize: 14,
  },
  restText: {
    fontWeight: 800,
    fontSize: 18,
  },
  restRating: {
    fontWeight: 800,
    fontSize: 16,
    marginRight: 8,
  },
  restDelivery: {
    fontSize: 12,
    color: Colors.light.secondaryText,
  },
  restPromo: {
    marginTop: 6,
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: staticColors.common.bg,
    color: staticColors.primary.bg,
    borderRadius: 12,
  },
  restImage: {
    height: imgHeight,
    width: imgWidth,
    borderRadius: 12,
  },
  restBigImage: {
    height: imgHeight * 2,
    width: bigImgWidth,
    borderRadius: 30,
  },
});

export default memo(SortedRestBlock);
