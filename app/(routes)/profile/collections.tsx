import React from 'react';

import { StyleSheet } from 'react-native';

import { Divider, LayoutWithAnimatedHeader, Text } from '@/components';

export default function Collections() {
  return (
    <LayoutWithAnimatedHeader title='Мои коллекции'>
      <>
        <Text>Коллекция 1</Text>
        <Divider />
        <Text>Коллекция 2</Text>
        <Divider />
        <Text>Коллекция 3</Text>
      </>
    </LayoutWithAnimatedHeader>
  );
}

const styles = StyleSheet.create({});
