import React, { FC, memo, PropsWithChildren } from 'react';

import { StyleSheet, View } from 'react-native';

import { Text } from '@/components';

interface IProps extends PropsWithChildren {
  title: string;
}

const Description: FC<IProps> = ({ title, children }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {},
  text: {},
});

export default memo(Description);
