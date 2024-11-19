import React, { FC, memo, RefObject } from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';

import { Button, Gap, Text } from '@/components';
import { router } from 'expo-router';

interface IProps {
  bottomSheetRef: RefObject<BottomSheet>;
}

const ChooseAuthTypeModal: FC<IProps> = ({ bottomSheetRef }) => {
  return (
    <BottomSheet
      index={-1}
      enablePanDownToClose
      enableDynamicSizing
      ref={bottomSheetRef}
    >
      <BottomSheetView style={styles.container}>
        <Text title center>
          Masya Eats
        </Text>
        <Gap />
        <Text center>Выберите способ авторизации</Text>
        <Gap />
        <Button
          btnProps={{ onPress: () => router.push('/(auth)/login') }}
          type='primary'
        >
          Войти
        </Button>
        <Gap />
        <Button btnProps={{ onPress: () => router.push('/(auth)/sign-up') }}>
          Новый аккаунт
        </Button>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
});

export default memo(ChooseAuthTypeModal);
