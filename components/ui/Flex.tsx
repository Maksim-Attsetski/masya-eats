import React, { FC, memo } from 'react';

import { FlexStyle, View, ViewProps } from 'react-native';

import Gap from './Gap';

interface IProps extends ViewProps {
  gap?: number;
  toDown?: boolean;
  justify?: FlexStyle['justifyContent'];
}

const Flex: FC<IProps> = ({ gap = 12, toDown = false, justify, ...props }) => {
  return (
    <>
      <View
        {...props}
        style={[
          props.style,
          {
            display: 'flex',
            flexDirection: 'row',
            gap,
            marginTop: toDown ? 'auto' : 0,
            justifyContent: justify,
            alignItems: 'center',
            maxWidth: '99.9999%',
          },
        ]}
      />
      {toDown && <Gap />}
    </>
  );
};

export default memo(Flex);
