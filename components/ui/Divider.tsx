import React, { FC, memo } from 'react';
import { View } from 'react-native';

const Divider: FC = () => {
  return (
    <View
      style={{
        marginVertical: 12,
        width: '75%',
        height: 0.7,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        borderRadius: 8,
      }}
    />
  );
};

export default memo(Divider);
