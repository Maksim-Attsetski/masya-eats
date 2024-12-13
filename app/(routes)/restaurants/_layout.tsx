import React, { memo } from 'react';

import { Stack } from 'expo-router';

const RestaurantLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_left',
        headerShown: false,
      }}
      initialRouteName='index'
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='[id]' />
      <Stack.Screen name='search-offers' />
    </Stack>
  );
};

export default memo(RestaurantLayout);
