import React, { FC, memo, PropsWithChildren } from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks';
import { PlusModal } from '../subscription';
import { ContainerPadding, SCREEN_WIDTH } from '@/global';
import LoadingView from './LoadingView';

interface IProps extends PropsWithChildren {
  loading?: boolean;
}

const Layout: FC<IProps> = ({ children, loading = false }) => {
  const bgColor = useThemeColor('background');
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <LoadingView loading={loading} />
      {children}
      <PlusModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ContainerPadding,
    flex: 1,
    width: SCREEN_WIDTH,
  },
});

export default memo(Layout);
