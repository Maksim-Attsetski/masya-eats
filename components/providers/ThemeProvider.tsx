import React, { FC, memo, PropsWithChildren } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks';
import { LoadingView } from '../ui';

const MyThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return <LoadingView loading initial></LoadingView>;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style='auto' />
      <LoadingView loading={!loaded} initial />

      {children}
    </ThemeProvider>
  );
};

export default memo(MyThemeProvider);
