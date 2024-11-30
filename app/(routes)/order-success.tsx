import { Text } from '@/components';
import React, { FC, memo } from 'react';
import { View } from 'react-native';

const OrderSuccess: FC = () => {
  return (
    <View>
      <Text>Success order</Text>
    </View>
  );
};

export default memo(OrderSuccess);
