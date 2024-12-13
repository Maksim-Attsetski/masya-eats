import React, { FC, memo, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, { SlideInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

import { ContainerPadding, useGlobalStore } from '@/global';
import { IAddress, useDelivery } from '@/widgets/delivery';
import { Button, Flex, Gap, Text } from '../ui';
import { getAddress } from '@/hooks';

const ConfirmAddress: FC = () => {
  const { delivery } = useDelivery();
  const { token } = useGlobalStore();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(true);

  const activeAddress: IAddress | null = useMemo(() => {
    const mainAddresss = delivery?.adresses?.find?.((item) => item.main);
    return mainAddresss ?? delivery?.adresses?.[0] ?? null;
  }, [delivery?.adresses]);

  const onPressUpdateAddress = () => {
    router.push('/(routes)/update-address');
  };

  return (
    isModalOpened &&
    token && (
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text title center>
            {activeAddress
              ? `Ваш адресс доставки ${getAddress(
                  activeAddress.address,
                  activeAddress.name
                )}?`
              : 'Укажите ваш адрес доставки'}
          </Text>
          <Gap y={16} />
          <Flex>
            <Button
              btnProps={{
                onPress: onPressUpdateAddress,
              }}
              size='small'
              full
              type={activeAddress?.address ? 'common' : 'primary'}
            >
              {activeAddress?.address ? 'Нет' : 'Перейти'}
            </Button>
            {activeAddress?.address && (
              <Button
                btnProps={{
                  onPress: () => setIsModalOpened(false),
                }}
                size='small'
                type='primary'
                full
              >
                Да
              </Button>
            )}
          </Flex>
        </View>
        <Animated.View entering={SlideInUp} style={styles.shadow} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: ContainerPadding,
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
  },
});

export default memo(ConfirmAddress);
