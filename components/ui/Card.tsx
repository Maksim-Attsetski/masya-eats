import React, { FC, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Text from './Text';
import { useThemeColor } from '@/hooks';

interface IProps extends ViewProps {
  loading?: boolean;
  loadingText?: string;
  rows?: number;
  rowHeight?: number;
}

const Card: FC<IProps> = (props) => {
  const backgroundColor = useThemeColor('cardBg');
  const styles = getStyles(props.rowHeight, backgroundColor);

  return (
    <View {...props} style={[styles.card, { backgroundColor }, props.style]}>
      {props.loading ? (
        <View style={styles.loading}>
          {(props?.loadingText?.length ?? 0) > 0 && (
            <Text style={styles.loadingText}>{props.loadingText}</Text>
          )}
          {Array.from(Array(props.rows ?? 3)).map((_, inx) => (
            <View style={styles.loadingItem} key={inx} />
          ))}
        </View>
      ) : (
        props.children && props.children
      )}
    </View>
  );
};

const getStyles = (height: number = 22, backgroundColor: string) =>
  StyleSheet.create({
    card: {
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    loading: {
      width: '100%',
      height: '100%',
    },
    loadingText: {
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 8,
      fontWeight: '600',
    },
    loadingItem: {
      width: '100%',
      height,
      // backgroundColor:
      // 'linear-gradient(90deg, rgba(233,233,233,1) 0%, rgba(208,208,208,1) 35%, rgba(147,147,147,1) 100%',
      backgroundColor,
      borderRadius: 12,
      marginVertical: 5,
    },
  });

export default memo(Card);
