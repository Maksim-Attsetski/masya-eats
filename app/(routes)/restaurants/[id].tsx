import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  SectionList,
  SectionListData,
  StyleSheet,
  View,
} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Colors,
  ContainerPadding,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  supabaseBucketImg,
} from '@/global';

import {
  IRestaurant,
  useRestaurant,
  RestaurantActionList,
} from '@/widgets/restaurants';
import {
  BackButton,
  Gap,
  LoadingView,
  OrderDetailModal,
  SearchButton,
  Text,
} from '@/components';
import {
  IRestaurantOffer,
  RestOfferCard,
  RestOfferModal,
  useRestOffers,
} from '@/widgets/restaurant-offer';
import { useBin } from '@/widgets/delivery';

const imgHeight = SCREEN_HEIGHT * 0.4;

const Restaurant: FC = () => {
  const insets = useSafeAreaInsets();
  const id = useLocalSearchParams()?.id;
  const { restaurants } = useRestaurant();
  const { onGetRestOffers, restOffers, restOffersLoading } = useRestOffers();
  const { bin } = useBin();

  const scrollValue = useSharedValue(0);
  const [activeOffer, setActiveOffer] = useState<IRestaurantOffer | null>(null);

  const item: IRestaurant | undefined = useMemo(() => {
    if (restaurants.length === 0) return undefined;

    return restaurants.find((r) => `${r.id}` === `${id}`);
  }, [restaurants, id]);

  const restOffersGenres = useMemo(() => {
    const result: any = {};
    restOffers.forEach((offer) => {
      result[offer.genre] = offer.genre;
    });
    return Object.keys(result);
  }, [restOffers]);

  const restOfferSections = useMemo(() => {
    const offersAsObject: {
      [key: string]: IRestaurantOffer[];
    } = {};
    const result = [];

    restOffers.forEach((offer) => {
      const title = offer.genre;
      if (offersAsObject[title]) {
        offersAsObject[title] = [...offersAsObject[title], offer];
      } else {
        offersAsObject[title] = [offer];
      }
    });

    for (const key in offersAsObject) {
      if (Object.prototype.hasOwnProperty.call(offersAsObject, key)) {
        const element = offersAsObject[key];
        result.push({ title: key, data: element });
      }
    }

    return result;
  }, [restOffers]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollValue.value = event.contentOffset.y;
  });

  const firstNameStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, [0, imgHeight / 2], [0, 1]),
      color: '#333',
    };
  }, []);

  const headerStyles = useAnimatedStyle(
    () => ({
      opacity: interpolate(scrollValue.value, [0, imgHeight / 1.3], [0, 1]),
    }),
    []
  );

  const secondNameStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, [0, imgHeight / 2], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            scrollValue.value,
            [0, imgHeight],
            [0, imgHeight * 1.2]
          ),
        },
      ],
    };
  }, []);

  useEffect(() => {
    item?.id && onGetRestOffers(item?.id);
  }, [item?.id]);

  return (
    <LoadingView loading={false}>
      {item ? (
        <>
          <View style={[styles.header, { flex: 1, top: insets.top }]}>
            <Animated.View style={[headerStyles, styles.headerBg]} />
            <View style={styles.headerBody}>
              <BackButton />
              <Animated.Text style={[styles.name, firstNameStyles]}>
                {item?.name}
              </Animated.Text>
              <SearchButton
                onPress={() =>
                  router.push({
                    pathname: '/(routes)/restaurants/search-offers',
                    params: { rest_name: item.public_id },
                  })
                }
              />
            </View>
          </View>
          <Animated.ScrollView
            onScroll={scrollHandler}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
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
              <Animated.Text style={[styles.name, secondNameStyles]}>
                {item?.name}
              </Animated.Text>
              <RestaurantActionList item={item} />
              <View style={styles.offersContainer}>
                <Gap />
                <FlatList
                  data={restOffersGenres}
                  renderItem={({ item: genre }) => (
                    <Text style={styles.genre}>{genre}</Text>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <Gap x={20} />}
                />
                <Gap />
                <Gap />
                <SectionList
                  sections={restOfferSections}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                  ItemSeparatorComponent={() => <Gap />}
                  contentContainerStyle={styles.offers}
                  initialNumToRender={7}
                  renderItem={({ item: restOffer }) => (
                    <RestOfferCard
                      setActiveOffer={setActiveOffer}
                      restId={item?.public_id}
                      restOffer={restOffer}
                    />
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <Text title style={{ marginVertical: 12 }}>
                      {title}
                    </Text>
                  )}
                />
              </View>
            </View>
            {bin.length > 0 && <Gap y={105} />}
          </Animated.ScrollView>
        </>
      ) : (
        <Text>Empty</Text>
      )}
      <RestOfferModal
        public_id={item?.public_id ?? ''}
        activeOffer={activeOffer}
        setActiveOffer={setActiveOffer}
      />
      {!activeOffer && bin.length > 0 && <OrderDetailModal restaurant={item} />}
    </LoadingView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 2,
    width: SCREEN_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: ContainerPadding,
    left: 0,
  },
  headerBg: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#fff',
  },
  headerBody: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
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
  offersContainer: {
    marginTop: -4,
    backgroundColor: '#fff',
    padding: ContainerPadding,
  },
  genre: {
    position: 'sticky',
    backgroundColor: Colors.light.cardBg,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  offers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
});

export default memo(Restaurant);
