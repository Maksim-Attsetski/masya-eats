import React, { FC, memo } from 'react';
import { View } from 'react-native';

interface IProps {
  y?: number;
}

const Gap: FC<IProps> = ({ y = 12 }) => {
  return <View style={{ height: y }} />;
};

export default memo(Gap);
