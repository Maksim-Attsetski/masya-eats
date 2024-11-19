import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import { AuthProvider, ThemeProvider } from '@/components';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack initialRouteName='(routes)'>
            <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            <Stack.Screen name='(routes)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </GestureHandlerRootView>
      </AuthProvider>
    </ThemeProvider>
  );
}
