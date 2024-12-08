import React, { FC, memo, PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from './Text';

interface IProps extends PropsWithChildren {
  loading?: boolean;
  initial?: boolean;
}

const Loader = memo(({ initial }: { initial: boolean }) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.absolute}>
      <View style={[styles.bg, { opacity: initial ? 1 : 0.8 }]} />
      {initial && (
        <View style={styles.textContainer}>
          <Text center>Добро пожаловать в</Text>
          <Text center title>
            Masya Eats !
          </Text>
        </View>
      )}
      <ActivityIndicator style={styles.indicator} size={'large'} />
    </Animated.View>
  );
});

const LoadingView: FC<IProps> = ({
  loading = false,
  initial = false,
  children,
}) => {
  return children !== undefined ? (
    <SafeAreaView style={styles.flex}>
      {children}
      {loading && <Loader initial={initial} />}
    </SafeAreaView>
  ) : (
    loading && <Loader initial={initial} />
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    inset: 0,
    zIndex: 99999,
  },
  bg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: [{ translateY: '-0%' }, { translateX: '-50%' }, { scale: 2 }],
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ scale: 3 }, { translateX: '-15%' }],
  },
  flex: {
    flex: 1,
  },
});

export default memo(LoadingView);
