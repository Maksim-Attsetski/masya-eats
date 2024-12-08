import React, { FC, memo, useMemo, useRef } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';

import {
  AreYouRight,
  Button,
  Divider,
  Flex,
  Gap,
  Layout,
  MiniHeader,
  OrderDetailModal,
  Text,
} from '@/components';
import { supabaseBucketImg } from '@/global';
import { useBin } from '@/widgets/delivery';
import { IRestaurantOffer, useRestOffers } from '@/widgets/restaurant-offer';
import { IRestaurant } from '@/widgets/restaurants';

const Order: FC = () => {
  const itemAsString = useLocalSearchParams()?.rest;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const restaurant: IRestaurant | null = useMemo(() => {
    if (itemAsString) return JSON.parse(itemAsString as string);
    return null;
  }, [itemAsString]);

  const { bin } = useBin();
  const { restOffers } = useRestOffers();

  const offersInBin = useMemo(() => {
    const offersAsObj: { [key: string]: IRestaurantOffer } = {};
    const offersInBinAsObj: {
      [key: string]: IRestaurantOffer & { count: number };
    } = {};

    restOffers.forEach((item) => {
      offersAsObj[item?.id] = item;
    });

    bin?.forEach((item) => {
      if (offersAsObj[item.offer_id]) {
        offersInBinAsObj[item?.offer_id] = {
          ...offersAsObj[item.offer_id],
          count: item.count,
        };
      }
    });

    return offersInBinAsObj;
  }, [restaurant]);

  const onPressClearOrder = async () => {};

  return (
    <>
      <Layout>
        <MiniHeader
          title={restaurant?.name ?? ''}
          right={
            <AntDesign
              name='delete'
              onPress={() => bottomSheetRef.current?.snapToIndex(0)}
              size={20}
              color='black'
            />
          }
        />
        <Divider />
        <FlatList
          data={Object.values(offersInBin)}
          renderItem={({ item }) => (
            <Flex justify='space-between'>
              <Flex>
                <Image
                  source={{
                    uri: `${supabaseBucketImg}restaurants-offers/${restaurant?.public_id}/${item.public_id}.${item.preview}`,
                  }}
                  height={50}
                  width={50}
                />
                <View>
                  <Text style={styles.text} title>
                    {item.name}
                  </Text>
                  <Gap y={4} />
                  <Text style={styles.text}>
                    {item.price} Br{' '}
                    <Text style={styles.greyText}>{item.weight}</Text>
                  </Text>
                </View>
              </Flex>
              <Flex>
                <Button size='small'>-</Button>
                <Text title>{item?.count}</Text>
                <Button size='small'>+</Button>
              </Flex>
            </Flex>
          )}
        />
        <Gap />
      </Layout>
      <OrderDetailModal restaurant={restaurant ?? undefined} final />
      <AreYouRight
        text='Очистить всю корзину'
        onConfirm={onPressClearOrder}
        bottomSheetRef={bottomSheetRef}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  greyText: {
    fontSize: 12,
    color: 'grey',
  },
});

export default memo(Order);
