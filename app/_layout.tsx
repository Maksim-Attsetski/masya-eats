import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import {
  AuthProvider,
  LocationProvider,
  NotificationProvider,
  ThemeProvider,
} from '@/components';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LocationProvider>
          <NotificationProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack initialRouteName='(routes)'>
                <Stack.Screen
                  name='(routes)'
                  options={{ headerShown: false, animation: 'slide_from_left' }}
                />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                <Stack.Screen
                  name='(modals)'
                  options={{
                    animation: 'slide_from_bottom',
                    headerShown: false,
                    presentation: 'fullScreenModal',
                  }}
                />
                <Stack.Screen name='+not-found' />
              </Stack>
            </GestureHandlerRootView>
          </NotificationProvider>
        </LocationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
