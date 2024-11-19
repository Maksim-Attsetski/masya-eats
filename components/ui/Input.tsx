import React, { FC, memo } from 'react';

import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';

import { staticColors } from '@/global/Colors';
import { useThemeColor } from '@/hooks';
import Text from './Text';

interface IProps {
  containerStyle?: ViewProps;
  textStyle?: TextProps;
  inputProps?: TextInputProps;
  title?: string;
}

const Input: FC<IProps> = ({
  title,
  containerStyle,
  inputProps,
  textStyle,
}) => {
  const secondaryText = useThemeColor('secondaryText');
  return (
    <View {...containerStyle} style={[containerStyle?.style, styles.container]}>
      <Text
        {...textStyle}
        style={[textStyle?.style, styles.title, { color: secondaryText }]}
      >
        {title}
      </Text>
      <TextInput {...inputProps} style={[inputProps?.style, styles.input]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: staticColors.common.bg,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});

export default memo(Input);
