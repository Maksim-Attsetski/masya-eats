import React, { memo } from 'react';

import { Stack } from 'expo-router';
import { Layout } from '@/components';

const RoutesLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_left',
        headerShown: false,
      }}
      initialRouteName='index'
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='profile' />
      <Stack.Screen name='restaurants/[id]' />
    </Stack>
  );
};

export default memo(RoutesLayout);
