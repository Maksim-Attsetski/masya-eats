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
      initialRouteName='profile'
      screenLayout={(props) => <Layout children={props.children} />}
    >
      <Stack.Screen name='profile' />
    </Stack>
  );
};

export default memo(RoutesLayout);
