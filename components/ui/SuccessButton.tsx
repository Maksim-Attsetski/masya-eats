import React, { FC, memo, useState } from 'react';

import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { staticColors } from '@/global';
import Text from './Text';

interface IProps {
  text: string;
  successText: string;
  onPress: () => void;
  onCancel?: () => void;
  full?: boolean;
}

const SuccessButton: FC<IProps> = ({
  onPress,
  onCancel,
  successText,
  text,
  full = false,
}) => {
  const [isSuccess, setSuccess] = useState(false);
  const styles = getStyles(isSuccess, full);

  const animatedStyle = useAnimatedStyle(() => ({
    top: withSpring(isSuccess ? 50 : 0),
    opacity: isSuccess ? 0 : 1,
  }));
  const animatedSuccessStyle = useAnimatedStyle(() => ({
    top: withSpring(isSuccess ? 0 : 50),
    opacity: isSuccess ? 1 : 0,
  }));

  const onPressButton = async () => {
    if (isSuccess) {
      if (onCancel) {
        await onCancel();
        setSuccess(false);
      }
    } else {
      await onPress();
      setSuccess(true);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPressButton}>
      {isSuccess ? (
        <Animated.View style={[animatedSuccessStyle, styles.flex]}>
          <Ionicons
            name='checkmark-sharp'
            size={24}
            color={staticColors[isSuccess ? 'primary' : 'common'].color}
          />
          <Text style={styles.text}>{successText}</Text>
        </Animated.View>
      ) : (
        <Animated.View style={[animatedStyle]}>
          <Text style={styles.text}>{text}</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (isSuccess?: boolean, full?: boolean) =>
  StyleSheet.create({
    button: {
      backgroundColor: staticColors[isSuccess ? 'primary' : 'common'].bg,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      flex: full ? 1 : 0,
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      width: '99.9%',
    },
    text: {
      textAlign: 'center',
      color: staticColors[isSuccess ? 'primary' : 'common'].color,
      fontSize: 20,
    },
  });

export default memo(SuccessButton);
