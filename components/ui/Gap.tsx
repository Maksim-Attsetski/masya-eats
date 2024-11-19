import React, { FC, memo } from 'react';
import { View } from 'react-native';

interface IProps {
  y?: number;
  x?: number;
}

const Gap: FC<IProps> = ({ y = 12, x = 0 }) => {
  return <View style={{ height: y, width: x }} />;
};

export default memo(Gap);
