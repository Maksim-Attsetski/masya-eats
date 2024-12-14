import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  interpolate,
  runOnJS,
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
  useRestaurant,
  RestaurantActionList,
  IRestaurant,
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
  RestOffersGenresList,
} from '@/widgets/restaurant-offer';
import { useBin } from '@/widgets/delivery';
import { getRestOfferSections } from '@/hooks';
import Empty from '@/components/ui/Empty';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const imgHeight = SCREEN_HEIGHT * 0.4;
const HEADER_HEIGHT = 65;
const GENRES_HEIGHT = 55;
const triger_genres_scroll = imgHeight - HEADER_HEIGHT - GENRES_HEIGHT * 0.7;

const RestOffersList: FC = () => {
  const id = useLocalSearchParams()?.id as string;
  const insets = useSafeAreaInsets();
  const { restaurants } = useRestaurant();
  const { onGetRestOffers, restOffers, restOffersLoading } = useRestOffers();
  const { bin } = useBin();

  const moreBottomSheet = useRef<BottomSheet>(null);
  const saveBottomSheet = useRef<BottomSheet>(null);

  const flatListRef = useRef<FlatList>(null);
  const [imgVisible, setImgVisible] = useState<boolean>(true);

  const scrollValue = useSharedValue(0);
  const [activeOffer, setActiveOffer] = useState<IRestaurantOffer | null>(null);

  const item: IRestaurant | undefined = useMemo(() => {
    if (restaurants.length === 0) return undefined;

    return restaurants.find((r) => `${r.id}` === `${id}`);
  }, [restaurants, id]);

  const restOfferSections = useMemo(
    () => getRestOfferSections(restOffers),
    [restOffers]
  );

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const newValue = event.contentOffset.y;
    scrollValue.value = newValue;
    if (newValue > triger_genres_scroll) {
      imgVisible && runOnJS(setImgVisible)(false);
    } else {
      !imgVisible && runOnJS(setImgVisible)(true);
    }
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

  const onPressGenre = (genre: string) => {
    const itemIndex = restOfferSections.findIndex(
      ({ title }) => title === genre
    );

    if (itemIndex >= 0) {
      flatListRef.current?.scrollToIndex({
        index: itemIndex,
        animated: true,
        viewOffset: HEADER_HEIGHT + GENRES_HEIGHT * 0.9,
      });
    }
  };

  const onPressSave = () => {
    router.push({
      pathname: '/(modals)/rest_save',
      params: { item: JSON.stringify(item) },
    });
  };

  const onPressMore = () => {
    router.push({
      pathname: '/(modals)/rest_more',
      params: { item: JSON.stringify(item) },
    });
  };

  useEffect(() => {
    item?.id && onGetRestOffers(item?.id);
  }, [item?.id]);

  return (
    <LoadingView loading={restOffersLoading}>
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
            {!imgVisible && restOfferSections.length > 0 && (
              <Animated.View
                key={'restOffersGenresList'}
                entering={FadeInUp}
                exiting={FadeOut}
              >
                <RestOffersGenresList
                  data={restOfferSections}
                  imgVisible={imgVisible}
                  onPress={onPressGenre}
                />
              </Animated.View>
            )}
          </View>
          <Animated.FlatList
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={{ height: imgHeight }}>
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
                <View style={styles.otherContent}>
                  <Animated.Text style={[styles.name, secondNameStyles]}>
                    {item?.name}
                  </Animated.Text>
                  <RestaurantActionList
                    onPressMore={onPressMore}
                    onPressSave={onPressSave}
                    item={item}
                  />
                  {imgVisible && restOfferSections.length > 0 && (
                    <Animated.View
                      key={'restOffersGenresList'}
                      entering={FadeInDown}
                      exiting={FadeOut}
                    >
                      <RestOffersGenresList
                        data={restOfferSections}
                        imgVisible={imgVisible}
                        onPress={onPressGenre}
                      />
                    </Animated.View>
                  )}
                </View>
              </View>
            )}
            ListFooterComponent={() => bin.length > 0 && <Gap y={105} />}
            data={restOfferSections}
            scrollEnabled
            ref={flatListRef}
            ListEmptyComponent={<Empty />}
            scrollEventThrottle={16}
            renderItem={({ item: { data, title } }) => (
              <View style={styles.offersContainer}>
                <Text title>{title}</Text>
                <Gap />
                <View style={styles.offers}>
                  {data.map((restOffer: IRestaurantOffer) => (
                    <RestOfferCard
                      key={restOffer.id}
                      setActiveOffer={setActiveOffer}
                      restId={item?.public_id}
                      restOffer={restOffer}
                    />
                  ))}
                </View>
              </View>
            )}
          />
        </>
      ) : (
        <Text>Такого ресторана нет</Text>
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
    height: HEADER_HEIGHT,
    paddingVertical: 12,
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
    zIndex: 0,
  },
  offers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
});

export default memo(RestOffersList);
