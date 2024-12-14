import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import { Text } from '@/components';
import { Colors, ContainerPadding } from '@/global';
import { useCollection } from '../useCollection';
import { FlatList } from 'react-native-gesture-handler';

const CollectionBottomSheet: FC = () => {
  const { collections } = useCollection();

  return (
    <TouchableOpacity
      onPress={() => router.push('/(routes)/order-success')}
      style={styles.order}
    >
      <FlatList
        data={collections}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
      <Text title center>
        Активный заказ №
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  order: {
    paddingHorizontal: ContainerPadding,
    paddingVertical: 16,
    backgroundColor: Colors.light.cardBg,
    borderRadius: 16,
    marginVertical: 12,
  },
});

export default memo(CollectionBottomSheet);
