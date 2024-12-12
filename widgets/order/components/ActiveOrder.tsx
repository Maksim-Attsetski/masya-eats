import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { router } from 'expo-router';

import { Text } from '@/components';
import { Colors, ContainerPadding } from '@/global';
import { useOrder } from '../useOrder';

const ActiveOrder: FC = () => {
  const { orders } = useOrder();

  const activeOrder = useMemo(
    () => orders.find((o) => o.created_at && o.created_at < Date.now()),
    [orders]
  );

  return (
    activeOrder && (
      <TouchableOpacity
        onPress={() => router.push('/(routes)/order-success')}
        style={styles.order}
      >
        <Text title center>
          Активный заказ №{activeOrder?.public_id}
        </Text>
      </TouchableOpacity>
    )
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

export default memo(ActiveOrder);
