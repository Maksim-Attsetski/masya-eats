import { Flex, PlusBtn, Text } from '@/components';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

const Header: FC = () => {
  return (
    <Flex justify='space-between' style={styles.container}>
      <View style={styles.user} />
      <Text>Header</Text>
      <PlusBtn />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: SCREEN_WIDTH,
    paddingVertical: 8,
  },
  user: {
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    borderRadius: '100%',
  },
});

export default memo(Header);
