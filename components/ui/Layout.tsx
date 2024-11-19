import React, { FC, memo, PropsWithChildren } from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks';
import { PlusModal } from '../subscription';
import { ContainerPadding } from '@/constants';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const bgColor = useThemeColor('background');
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {children}
      <PlusModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ContainerPadding,
    flex: 1,
  },
});

export default memo(Layout);
