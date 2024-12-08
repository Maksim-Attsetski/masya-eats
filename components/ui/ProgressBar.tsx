import React, { FC, memo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Text from './Text';
import { ContainerPadding } from '@/global';
import Animated, { withTiming } from 'react-native-reanimated';

interface IProps {
  progress?: number;
}

const { width } = Dimensions.get('screen');

const barWidth = width - ContainerPadding * 2;

const ProgressBar: FC<IProps> = ({ progress = 0 }) => {
  const styles = getStyles(progress);

  return (
    <View style={styles.container}>
      <View style={styles.bar} />
      <Animated.View
        style={[styles.active, { width: (barWidth / 100) * progress }]}
      />
    </View>
  );
};

const getStyles = (progress: number = 0) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      width: barWidth,
      alignSelf: 'center',
    },
    bar: {
      width: barWidth,
      height: 2,
      backgroundColor: progress > 50 ? 'rgba(255, 219, 14, 0.4)' : 'pink',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    active: {
      height: 2,
      backgroundColor:
        progress === 100 ? 'green' : progress > 50 ? 'orange' : 'red',
    },
  });

export default memo(ProgressBar);
