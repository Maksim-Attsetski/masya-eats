import React, { FC, memo } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface IProps {
  onPress: (e: GestureResponderEvent) => void;
}

const SearchButton: FC<IProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: '#fff', padding: 8, borderRadius: 24 }}
      onPress={onPress}
    >
      <MaterialCommunityIcons name='magnify' size={24} color='black' />
    </TouchableOpacity>
  );
};

export default memo(SearchButton);
