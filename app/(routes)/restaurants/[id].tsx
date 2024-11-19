import React, { FC, memo, useMemo } from 'react';
import {
  IRestaurant,
  RestaurantAction,
  useRestaurant,
} from '@/widgets/restaurants';
import {
  FlatList,
  Image,
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

const imgHeight = SCREEN_HEIGHT * 0.4;
const otherContentTop = imgHeight / 2;

const Restaurant: FC = () => {
  const id = useLocalSearchParams()?.id;
  const { restaurants } = useRestaurant();

  const item: IRestaurant | undefined = useMemo(() => {
    if (restaurants.length === 0) return undefined;

    return restaurants.find((r) => `${r.id}` === `${id}`);
  }, [restaurants, id]);

  return (
    <SafeAreaView>
      {item ? (
        <View>
          <Image
            source={{
              uri:
                supabaseBucketImg +
                `restaurants/${item?.name}.${item?.preview}`,
            }}
            style={styles.img}
            height={imgHeight}
            width={SCREEN_WIDTH}
          />
          <Gap />
          <View style={styles.otherContent}>
            <Text
              style={{
                fontSize: 32,
                color: '#fff',
                fontWeight: '900',
              }}
            >
              {item?.name}
            </Text>
            <RestaurantActionList item={item} />
          </View>

          <FlatList
            horizontal
            data={Array.from({ length: 40 }).map((_, inx) => inx)}
            renderItem={({ index }) => (
              <View>
                <Text>{index}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          />
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
  otherContent: {
    position: 'absolute',
    top: otherContentTop,
    left: ContainerPadding,
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
