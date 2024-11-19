import React, { FC, memo, useEffect, useMemo } from 'react';
import {
  IRestaurant,
  RestaurantAction,
  useRestaurant,
} from '@/widgets/restaurants';
import {
  FlatList,
  Image,
  ScrollView,
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
import RestaurantActionList from '@/widgets/restaurants/components/RestaurantActionList';
import { RestOfferCard, useRestOffers } from '@/widgets/restaurant-offer';

const imgHeight = SCREEN_HEIGHT * 0.4;

const Restaurant: FC = () => {
  const id = useLocalSearchParams()?.id;
  const { restaurants } = useRestaurant();
  const { onGetRestOffers, restOffers } = useRestOffers();

  const item: IRestaurant | undefined = useMemo(() => {
    if (restaurants.length === 0) return undefined;

    return restaurants.find((r) => `${r.id}` === `${id}`);
  }, [restaurants, id]);

  useEffect(() => {
    item?.id && onGetRestOffers(item?.id);
  }, [item?.id]);

  return (
    <SafeAreaView>
      {item ? (
        <View>
          <Image
            source={{
              uri:
                supabaseBucketImg +
                `restaurants/${item?.public_id}.${item?.preview}`,
            }}
            style={styles.img}
            height={imgHeight}
            width={SCREEN_WIDTH}
          />
          <Gap />
          <View style={styles.otherContent}>
            <Text style={styles.name}>{item?.name}</Text>
            <RestaurantActionList item={item} />
            <FlatList
              data={[...restOffers, ...restOffers]}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                gap: 12,
              }}
              contentContainerStyle={styles.offers}
              scrollEnabled
              renderItem={({ item: restOffer }) => (
                <RestOfferCard restId={item?.public_id} restOffer={restOffer} />
              )}
              keyExtractor={(item, inx) => item.id + inx}
              ListEmptyComponent={<Text>Пусто</Text>}
              ItemSeparatorComponent={() => <Gap />}
            />
          </View>
        </View>
      ) : (
        <Text>Empty</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    inset: 0,
  },
  name: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '900',
    paddingHorizontal: ContainerPadding,
  },
  otherContent: {
    marginTop: imgHeight / 2.1,
  },
  offers: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: ContainerPadding * 2,
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

export default memo(Restaurant);
