import React, { FC, memo, PropsWithChildren } from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const bgColor = useThemeColor('background');
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default memo(Layout);
