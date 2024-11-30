import React, { FC, memo, ReactNode, RefObject, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, Flex, Gap, Text } from '../ui';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { StyleSheet } from 'react-native';
import { ContainerPadding } from '@/global';

interface IProps {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  onConfirm: () => void;
  text?: string;
}

const AreYouRight: FC<IProps> = ({ bottomSheetRef, onConfirm, text }) => {
  const onPressConfirm = () => {
    onConfirm();
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      index={-1}
      enableDynamicSizing
      enablePanDownToClose
      ref={bottomSheetRef}
    >
      <BottomSheetView style={styles.container}>
        <Text center style={styles.title}>
          Вы уверены?
        </Text>
        {text && (
          <>
            <Gap />
            <Text style={styles.text} center title>
              {text}
            </Text>
          </>
        )}
        <Gap />
        <Flex justify='space-between'>
          <Button
            full
            btnProps={{
              onPress: () => bottomSheetRef.current?.close(),
            }}
          >
            Отменить
          </Button>
          <Button
            full
            btnProps={{
              onPress: onPressConfirm,
            }}
            type='secondary'
          >
            Да
          </Button>
        </Flex>
        <Gap />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ContainerPadding,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    color: 'grey',
  },
});

export default memo(AreYouRight);
