import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';

import { supabaseBucketImg, ContainerPadding, SCREEN_WIDTH } from '@/global';
import { IRestPromotion, useRestaurant } from '@/widgets/restaurants';
import { Gap, Text } from './ui';

const imgSize = SCREEN_WIDTH / 2 - ContainerPadding * 2;
const bigImgSize = SCREEN_WIDTH - ContainerPadding * 2;

const RestPromotions: FC = () => {
  const { restaurants } = useRestaurant();
  const [viewableItem, setViewbleItem] = useState<number>(0);

  const isFocused = useIsFocused();

  const flatlistRef = useRef<FlatList>(null);

  const promotions: (IRestPromotion & { public_id: string })[] = useMemo(
    () =>
      restaurants
        .map((item) => {
          const promo = item.promotions.find((promo) => promo.preview);
          return promo ? { ...promo, public_id: item.public_id } : null;
        })
        .filter((item) => !!item),
    [restaurants]
  );

  useEffect(() => {
    const bigPromo = promotions.filter((promo) => promo.isFullScreen);
    if (
      bigPromo.length < 2 ||
      (bigPromo.length === 0 && promotions.length <= 2)
    )
      return;

    let timerId;
    if (!isFocused) {
      clearInterval(timerId);
      return;
    }

    timerId = setInterval(() => {
      if (flatlistRef) {
        const nextItem = promotions[viewableItem + 1];
        flatlistRef.current?.scrollToIndex({
          index: nextItem ? viewableItem + 1 : 0,
          animated: true,
        });
      }
    }, 2000);

    return () => {
      clearInterval(timerId);
    };
  }, [isFocused, promotions, flatlistRef, viewableItem]);

  return (
    <View>
      <Text title>Скидки и многое другое</Text>
      <Gap />
      <FlatList
        data={promotions}
        horizontal
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        windowSize={3}
        onViewableItemsChanged={({ viewableItems }) => {
          setViewbleItem(viewableItems.reverse()[0].index ?? 0);
        }}
        snapToInterval={bigImgSize}
        pagingEnabled
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(routes)/restaurants/[id]',
                params: { id: item.rest_id },
              })
            }
          >
            <Image
              source={{
                uri: supabaseBucketImg + `promo/${item.public_id}.webp`,
              }}
              style={{
                width: item.isFullScreen ? bigImgSize : imgSize,
                height: imgSize,
                borderRadius: 8,
                marginRight:
                  index === promotions.length - 1 || item.isFullScreen
                    ? 0
                    : ContainerPadding,
              }}
            />
          </TouchableOpacity>
        )}
      />
      <Gap />
    </View>
  );
};

export default memo(RestPromotions);
