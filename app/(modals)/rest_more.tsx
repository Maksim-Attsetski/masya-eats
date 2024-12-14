import React, { FC, memo, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Link, useLocalSearchParams } from 'expo-router';

import { IRestaurant } from '@/widgets/restaurants';
import { Divider, Flex, Gap, Layout, MiniHeader, Text } from '@/components';
import { Colors } from '@/global';

const RestMore: FC = () => {
  const item = useLocalSearchParams()?.item as string;

  const rest: IRestaurant | undefined = useMemo(() => {
    if (item === undefined) {
      return item;
    }
    return JSON.parse(item);
  }, [item]);

  const renderTime = useCallback((time: number = 0) => {
    const minutes = Number.isInteger(time) ? '00' : '30';
    const hours = time > 9 ? time : '0' + time;
    return hours + ':' + minutes;
  }, []);

  const work_from = useMemo(
    () => renderTime(rest?.locations[0].work_from),
    [rest?.locations]
  );
  const work_until = useMemo(
    () => renderTime(rest?.locations[0].work_until),
    [rest?.locations]
  );

  return (
    <Layout>
      {rest ? (
        <>
          <MiniHeader title={rest.name} />
          <Gap y={20} />
          <Text title>{rest?.locations[0].address}</Text>
          <Gap />
          <Text>Открыто</Text>
          <Text style={styles.secondary}>
            <Gap x={6} y={0} />
            От {work_from}
          </Text>
          <Text style={styles.secondary}>
            <Gap x={6} y={0} />
            До {work_until}
          </Text>
          <Gap y={20} />
          <FlatList
            data={rest.tags}
            horizontal
            ItemSeparatorComponent={() => <View style={styles.dot} />}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
          <Gap />
          {rest?.description.length > 0 && (
            <>
              <Divider />
              <Text>{rest?.description}</Text>
            </>
          )}
          <Gap />
        </>
      ) : (
        <>
          <Link href={'../'}>Назад</Link>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  secondary: {
    color: Colors.light.secondaryText,
  },
  dot: {
    width: 5,
    height: 5,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.light.secondaryText,
  },
});

export default memo(RestMore);
