import React, { FC, memo, ReactNode } from 'react';

import { BackButton, Flex, Gap, Text } from '@/components';

interface IProps {
  title: string;
  right?: ReactNode;
}

const MiniHeader: FC<IProps> = ({ title, right }) => {
  return (
    <>
      <Gap />
      <Flex justify='space-between'>
        <BackButton />
        <Gap />
        <Text center title>
          {title}
        </Text>
        <Gap />
        {right ? right : <Gap x={50} />}
      </Flex>
    </>
  );
};

export default memo(MiniHeader);
