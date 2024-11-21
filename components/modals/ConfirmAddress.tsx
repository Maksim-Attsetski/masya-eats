import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { Button, Flex, Gap, Text } from '../ui';
import { StyleSheet, View } from 'react-native';
import { ContainerPadding } from '@/global';
import Animated, {
  FadeInUp,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useDelivery } from '@/widgets/delivery';
interface IUserAddress {
  address: string;
  main: boolean;
}

const ConfirmAddress: FC = () => {
  const { delivery } = useDelivery();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(true);

  const activeAddress: IUserAddress | null = useMemo(() => {
    const mainAddresss = delivery.adresses.find((item) => item.main);
    return mainAddresss ?? delivery.adresses[0] ?? null;
  }, [delivery.adresses]);

  const onPressUpdateAddress = () => {
    router.push('/(routes)/update-address');
  };

  return (
    isModalOpened && (
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text title center>
            {activeAddress
              ? `Ваш адресс доставки ${activeAddress?.address}?`
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
