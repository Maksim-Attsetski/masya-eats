import React, { FC, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '../ui';
import { useGlobalStore } from '@/global';

const PlusBtn: FC = () => {
  const { setPlusModal } = useGlobalStore();

  return (
    <View
      style={{
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#333',
      }}
    >
      <TouchableOpacity onPress={() => setPlusModal(true)}>
        <Text style={{ color: '#fff' }}>Plus</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(PlusBtn);
