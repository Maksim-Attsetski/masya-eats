import React, { FC, memo } from 'react';
import Card from './Card';

interface IProps {
  rows?: number;
  rowHeight?: number;
  maxHeight?: number;
  loadingText?: string;
}

const Skeleton: FC<IProps> = ({
  rows = 1,
  rowHeight = 30,
  maxHeight = 50,
  loadingText = '',
}) => {
  return (
    <Card
      loading
      style={{ maxHeight }}
      rows={rows}
      rowHeight={rowHeight}
      loadingText={loadingText}
    />
  );
};

export default memo(Skeleton);
