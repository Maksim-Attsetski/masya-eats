import React, { FC, memo, PropsWithChildren } from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks';
import { PlusModal } from '../subscription';
import { ContainerPadding, SCREEN_WIDTH } from '@/global';
import LoadingView from './LoadingView';

interface IProps extends PropsWithChildren {
  loading?: boolean;
  scrollable?: boolean;
}

const Layout: FC<IProps> = ({
  children,
  loading = false,
  scrollable = false,
}) => {
  const bgColor = useThemeColor('background');
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}

      <LoadingView loading={loading} />
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
