import React, { memo } from 'react';

import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_left',
        headerShown: false,
      }}
      initialRouteName='index'
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='about' />
      <Stack.Screen name='collections' />
      <Stack.Screen name='notifications' />
      <Stack.Screen name='promocodes' />
      <Stack.Screen name='orders' />
      {/* <Stack.Screen name='update-address' /> */}
    </Stack>
  );
};

export default memo(ProfileLayout);
