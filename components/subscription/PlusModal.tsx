import React, { FC, memo, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { Button, Flex, Gap, SuccessButton, Text } from '../ui';
import { ContainerPadding, useGlobalStore } from '@/global';
import { useAuth } from '@/widgets';
import { router } from 'expo-router';
import { useNotification } from '@/hooks/useNotification';

const PlusModal: FC = () => {
  const ref = useRef<BottomSheet>(null);
  const { plusModal, setPlusModal } = useGlobalStore();
  const { onSendNotification } = useNotification();

  const { user } = useAuth();

  const onPressOk = () => {
    router.push('/(auth)/auth-base');
    setPlusModal(false);
  };

  useEffect(() => {
    plusModal ? ref.current?.snapToIndex(0) : ref.current?.close();
  }, [plusModal]);

  return (
    <BottomSheet
      index={-1}
      onChange={(props) => {
        props === -1 && setPlusModal(false);
      }}
      enablePanDownToClose
      enableDynamicSizing
      ref={ref}
    >
      <BottomSheetView style={styles.container}>
        {user ? (
          <>
            <Text>Get plus sub</Text>
            <Text>Get plus sub</Text>
            <Text>Get plus sub</Text>
            <Text>Get plus sub</Text>
            <Text>Get plus sub</Text>
            <Gap />
            <SuccessButton
              onPress={() =>
                onSendNotification(
                  'Успешно!',
                  'Вы оформили подписку Masya Eats Plus'
                )
              }
              successText='Subscribed!'
              text='Subscribe'
            ></SuccessButton>
          </>
        ) : (
          <>
            <Text title>Авторизуйтесь, чтобы использовать подписку</Text>
            <Gap />
            <Text>
              Если у вас есть Masya Plus и это доступно в вашем городе,
              зарабатывайте очки "Eats" и тратьи их на следующие заказы
            </Text>
            <Gap y={30} />
            <Flex justify='space-between'>
              <Button btnProps={{ onPress: () => setPlusModal(false) }} full>
                Не сейчас
              </Button>

              <Button btnProps={{ onPress: onPressOk }} full type='primary'>
                ОК
              </Button>
            </Flex>
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: ContainerPadding,
  },
});

export default memo(PlusModal);
