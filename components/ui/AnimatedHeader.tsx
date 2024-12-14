import React, { FC, memo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContainerPadding } from '@/global';
import BackButton from './BackButton';

interface IProps {
  title: string;
  scrollY: SharedValue<number>;
  btn?: ReactNode;
  onLeftPress?: () => void;
}

const HEADER_HEIGHT = 60;
const TEXT_PADDING = 40;
const FULL_HEADER_HEIGHT = HEADER_HEIGHT + TEXT_PADDING;
const BTN_SIZE = 40;
const input = [0, 50];

const AnimatedHeader: FC<IProps> = ({
  title,
  scrollY,
  btn = null,
  onLeftPress,
}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets.top);

  const animHeaderStyles = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      input,
      [FULL_HEADER_HEIGHT, HEADER_HEIGHT],
      Extrapolation.CLAMP
    ),
  }));

  const animTextStyles = useAnimatedStyle(() => ({
    fontSize: interpolate(scrollY.value, input, [32, 22], Extrapolation.CLAMP),
    position: 'absolute',
    top: interpolate(
      scrollY.value,
      input,
      [TEXT_PADDING + 8, HEADER_HEIGHT / 4],
      Extrapolation.CLAMP
    ),
    left: interpolate(
      scrollY.value,
      input,
      [ContainerPadding, BTN_SIZE + ContainerPadding * 2],
      Extrapolation.CLAMP
    ),
    fontWeight: 700,
  }));

  return (
    <>
      <Animated.View style={[styles.header, animHeaderStyles]}>
        <Animated.Text style={animTextStyles}>{title}</Animated.Text>
      </Animated.View>
      <View style={[styles.btn, styles.left]}>
        <BackButton onPress={onLeftPress} withoutBg />
      </View>
      {btn && <View style={[styles.btn, styles.right]}>{btn}</View>}
    </>
  );
};

const getStyles = (top: number) =>
  StyleSheet.create({
    header: {
      height: HEADER_HEIGHT,
      paddingHorizontal: ContainerPadding,
      marginHorizontal: -ContainerPadding,
    },
    btn: {
      position: 'absolute',
      top: 6 + top,
      width: BTN_SIZE,
      height: BTN_SIZE,
    },
    right: {
      right: ContainerPadding,
    },
    left: {
      left: ContainerPadding,
    },
  });

export default memo(AnimatedHeader);
