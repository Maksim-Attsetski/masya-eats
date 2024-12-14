import React, { memo } from 'react';

import { Stack } from 'expo-router';
import { Layout } from '@/components';

const ModalsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='rest_more' />
      <Stack.Screen name='rest_save' />
    </Stack>
  );
};

export default memo(ModalsLayout);
