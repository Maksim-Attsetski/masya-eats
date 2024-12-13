import React, { FC, memo } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const BackButton: FC = () => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: '#fff', padding: 8, borderRadius: 24 }}
      onPress={() =>
        router?.canGoBack() ? router.back() : router.push('/(routes)')
      }
    >
      <Ionicons name='arrow-back' size={24} color='black' />
    </TouchableOpacity>
  );
};

export default memo(BackButton);
