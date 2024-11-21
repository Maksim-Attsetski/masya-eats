import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import { AuthProvider, LocationProvider, ThemeProvider } from '@/components';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LocationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack initialRouteName='(routes)'>
              <Stack.Screen
                name='(routes)'
                options={{ headerShown: false, animation: 'slide_from_left' }}
              />
              <Stack.Screen name='(auth)' options={{ headerShown: false }} />
              <Stack.Screen name='+not-found' />
            </Stack>
          </GestureHandlerRootView>
        </LocationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
