import React, { FC, memo } from 'react';

import { StyleSheet } from 'react-native';

import { ProfileBtn } from '@/widgets';
import { Flex, PlusBtn, Text } from '@/components';
import { ContainerPadding, SCREEN_WIDTH } from '@/global';

const Header: FC = () => {
  return (
    <Flex justify='space-between' style={styles.container}>
      <ProfileBtn />
      <Text>Header</Text>
      <PlusBtn />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: SCREEN_WIDTH - ContainerPadding * 4,
    paddingVertical: 8,
  },
});

export default memo(Header);
