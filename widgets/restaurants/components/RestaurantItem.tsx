import React, { FC, memo } from 'react';
import { IRestaurant } from '../types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ContainerPadding, SCREEN_WIDTH, supabaseBucketImg } from '@/global';
import { Flex, Gap, Text } from '@/components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

interface IProps {
  item: IRestaurant;
  full?: boolean;
}

const imgWidth = SCREEN_WIDTH * 0.8;
const fullImgWidth = SCREEN_WIDTH - ContainerPadding * 2;

const imgHeight = 150;
const fullImgHeight = 200;

const RestaurantItem: FC<IProps> = ({ item, full = false }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/(routes)/restaurants/[id]',
          params: { id: item?.id },
        })
      }
      style={{ width: full ? fullImgWidth - ContainerPadding : imgWidth }}
    >
      <Image
        source={{
          uri:
            supabaseBucketImg +
            `restaurants/${item?.public_id}.${item?.preview}`,
        }}
        style={styles.img}
        height={full ? fullImgHeight : imgHeight}
        width={full ? fullImgWidth : imgWidth}
      />
      <Gap />
      <Flex justify='space-between'>
        <Text title>{item?.name}</Text>
        <Flex gap={4}>
          <AntDesign name='star' size={14} color='black' />
          <Text>{item?.rating?.length}</Text>
        </Flex>
      </Flex>
      <Flex gap={6}>
        <MaterialCommunityIcons name='truck-delivery' size={24} color='black' />
        <Text>
          {item?.delivery_time[0]} - {item?.delivery_time[1]} мин.
        </Text>
      </Flex>

      <Gap />
      <Flex>
        {item?.promotions.map((promo) => (
          <Text style={styles.news} key={promo.title}>
            {promo.title} - {promo.description}
          </Text>
        ))}
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 24,
  },
  news: {
    fontSize: 10,
    fontWeight: '600',
    color: 'green',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'lightgreen',
    borderRadius: 12,
  },
});

export default memo(RestaurantItem);
