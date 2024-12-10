import React, { FC, PropsWithChildren, memo } from 'react';

import Text from './Text';
import Card from './Card';
import Gap from './Gap';

const Empty: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card>
      <Text title>Ничего не найдено</Text>
      {children && (
        <>
          <Gap />
          <Text style={{ textAlign: 'center' }}>{children}</Text>
        </>
      )}
    </Card>
  );
};

export default memo(Empty);
