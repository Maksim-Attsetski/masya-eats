import React, { FC, memo } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const SearchButton: FC = () => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: '#fff', padding: 8, borderRadius: 24 }}
      onPress={() =>
        router?.canGoBack() ? router.back() : router.push('/(routes)/index')
      }
    >
      <MaterialCommunityIcons name='magnify' size={24} color='black' />
    </TouchableOpacity>
  );
};

export default memo(SearchButton);
