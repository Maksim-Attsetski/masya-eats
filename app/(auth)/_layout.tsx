import React from 'react';

import { Stack } from 'expo-router';
import { memo } from 'react';
import { Layout } from '@/components';

const AuthLayout = () => {
  return (
    <Stack
      initialRouteName='auth-base'
      screenOptions={{
        animation: 'slide_from_left',
        headerShown: false,
      }}
      screenLayout={(props) => <Layout children={props.children} />}
    >
      <Stack.Screen name='auth-base' />
      <Stack.Screen name='login' />
      <Stack.Screen name='sign-up' />
      <Stack.Screen name='sign-up-detail' />
    </Stack>
  );
};

export default memo(AuthLayout);
