import React, { FC, memo, PropsWithChildren } from 'react';

const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default memo(LocationProvider);
