import React, { FC, memo } from 'react';
import { Text, TextProps } from 'react-native';

import { useThemeColor } from '@/hooks';

interface IProps extends TextProps {
  title?: boolean;
  center?: boolean;
}

const MyText: FC<IProps> = (props) => {
  const textColor = useThemeColor('text');
  return (
    <Text
      {...props}
      style={[
        {
          color: textColor,
          fontSize: props.title ? 20 : 16,
          fontWeight: props?.title ? 'bold' : '400',
          textAlign: props.center ? 'center' : 'left',
          fontFamily: 'SpaceMono',
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export default memo(MyText);
