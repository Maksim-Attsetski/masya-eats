import React, { FC, memo } from 'react';

import { FlexStyle, View, ViewProps } from 'react-native';

import Gap from './Gap';

interface IProps extends ViewProps {
  gap?: number;
  toDown?: boolean;
  justify?: FlexStyle['justifyContent'];
}

const Flex: FC<IProps> = ({ gap = 12, toDown = false, ...props }) => {
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
          },
        ]}
      />
      {toDown && <Gap />}
    </>
  );
};

export default memo(Flex);
