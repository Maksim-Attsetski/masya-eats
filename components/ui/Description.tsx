import React, { FC, memo, PropsWithChildren } from 'react';

import { StyleSheet, View } from 'react-native';

import { Text } from '@/components';
import { Colors } from '@/global';

interface IProps extends PropsWithChildren {
  title: string;
}

const Description: FC<IProps> = ({ title, children }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    color: Colors.light.secondaryText,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default memo(Description);
