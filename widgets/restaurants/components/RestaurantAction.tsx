import React, { FC, memo, PropsWithChildren, ReactNode } from 'react';

import { StyleSheet, View } from 'react-native';

import { Flex, Text } from '@/components';

interface IProps extends PropsWithChildren {
  title?: string;
  content: string[];
}

const RestaurantAction: FC<IProps> = ({ title, children, content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {children} {title}
        </Text>
        <Text style={styles.text}>{content[0]}</Text>
        {content[1] && <Text style={styles.subText}>{content[1]}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    fontWeight: 'bold',
    top: -16,
    left: -16,
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  text: {
    fontSize: 12,
    marginTop: -6,
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default memo(RestaurantAction);
