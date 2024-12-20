import React, { FC, memo, ReactNode, RefObject, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, Flex, Gap, Text } from '../ui';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { StyleSheet } from 'react-native';
import { ContainerPadding } from '@/global';
import { router } from 'expo-router';

interface IProps {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}

const PleaseLogin: FC<IProps> = ({ bottomSheetRef }) => {
  const onPress = () => {
    router.push('/(auth)/login');
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
          Вам нужно авторизоваться
        </Text>
        <Gap />
        <Text center>Для создания заказа вам нужно войти в ваш аккаунт</Text>
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
          <Button full btnProps={{ onPress }} type='primary'>
            Перейти
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

export default memo(PleaseLogin);
