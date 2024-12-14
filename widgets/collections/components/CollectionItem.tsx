import { AreYouRight, Flex, Text } from '@/components';
import React, { FC, memo, useMemo, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICollection } from '../types';
import { IRestaurant, useRestaurant } from '@/widgets/restaurants';
import { supabaseBucketImg } from '@/global';
import { useThemeColor } from '@/hooks';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCollection } from '../useCollection';

interface IProps {
  collection: ICollection;
}

const imgSize = 100;

function RightAction(onPress: () => void, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value - 30 }],
      width: 75,
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.rightAction}>
          <AntDesign name='delete' size={32} color='#eee' />
        </Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}

const CollectionItem: FC<IProps> = ({ collection }) => {
  const { restaurants } = useRestaurant();
  const { onDeleteCollection } = useCollection();
  const bgColor = useThemeColor('cardBg');

  const bottomSheetRef = useRef<BottomSheet>(null);

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
    <>
      <ReanimatedSwipeable
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={70}
        renderLeftActions={(_, drag) =>
          RightAction(() => bottomSheetRef.current?.snapToIndex(0), drag)
        }
      >
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
                style={[
                  styles.fakeImage,
                  styles.img,
                  { backgroundColor: bgColor },
                ]}
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
      </ReanimatedSwipeable>
      <AreYouRight
        bottomSheetRef={bottomSheetRef}
        onConfirm={() => onDeleteCollection(collection?.id)}
      />
    </>
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
  rightAction: {
    width: 60,
    height: 100,
    backgroundColor: '#ef4d58',
    textAlign: 'center',
    paddingVertical: 30,
    borderRadius: 12,
  },
  swipeable: {
    alignItems: 'center',
    transform: [{ translateX: -45 }],
  },
});

export default memo(CollectionItem);
