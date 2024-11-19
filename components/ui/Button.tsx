import React, { FC, memo, PropsWithChildren } from 'react';

import {
  StyleSheet,
  TouchableHighlight,
  TextProps,
  TouchableHighlightProps,
} from 'react-native';
import { LinkProps, router } from 'expo-router';

import { staticColors } from '@/global/Colors';
import Text from './Text';

type TBtnType = 'primary' | 'secondary' | 'common';
type TBtnSize = 'small' | 'medium' | 'large';

interface IProps extends PropsWithChildren {
  to?: LinkProps['href'];
  btnProps?: TouchableHighlightProps;
  textProps?: TextProps;
  type?: TBtnType;
  full?: boolean;
  size?: TBtnSize;
}

const MyButton: FC<IProps> = ({
  btnProps,
  textProps,
  children,
  to,
  type = 'common',
  full = false,
  size = 'medium',
}) => {
  const styles = getStyles(type, btnProps?.disabled, full, size);

  return (
    <TouchableHighlight
      {...btnProps}
      underlayColor={staticColors[type].opacity}
      onPress={(event) => {
        btnProps?.onPress?.(event);
        to && router.push(to);
      }}
      style={[styles.btn, btnProps?.style]}
    >
      <Text {...textProps} style={[styles.text, textProps?.style]}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

const getStyles = (
  type: TBtnType,
  disabled?: boolean,
  full?: boolean,
  size?: TBtnSize
) =>
  StyleSheet.create({
    btn: {
      backgroundColor: staticColors[type][disabled ? 'opacity' : 'bg'],
      paddingVertical: size === 'medium' ? 16 : size === 'small' ? 12 : 20,
      paddingHorizontal: size === 'medium' ? 24 : size === 'small' ? 14 : 24,
      borderRadius: 12,
      flex: full ? 1 : 0,
    },
    text: {
      textAlign: 'center',
      color: staticColors[type].color,
      fontSize: size === 'medium' ? 20 : size === 'small' ? 16 : 24,
    },
  });

export default memo(MyButton);
