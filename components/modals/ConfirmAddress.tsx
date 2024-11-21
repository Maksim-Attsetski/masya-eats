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
interface IUserAddress {
  address: string;
  main: boolean;
}

const ConfirmAddress: FC = () => {
  const [address, setAddress] = useState<IUserAddress[]>([]);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const activeAddress: IUserAddress | null = useMemo(() => {
    const mainAddresss = address.find((item) => item.main);
    return mainAddresss ?? address[0] ?? null;
  }, [address]);

  const onGetUserAdresses = async () => {
    const addressAsString = await AsyncStorage.getItem('address');
    if (addressAsString) {
      setAddress(JSON.parse(addressAsString));
    }
    setIsModalOpened(true);
  };

  const onPressUpdateAddress = () => {
    router.push('/(routes)/update-address');
  };

  useEffect(() => {
    onGetUserAdresses();
  }, []);

  return (
    isModalOpened && (
      <View style={styles.container}>
        {activeAddress ? (
          <View style={styles.modalContainer}>
            <Text title center>
              Ваш адресс доставки {activeAddress?.address}?
            </Text>
            <Gap y={16} />
            <Flex>
              <Button
                btnProps={{
                  onPress: onPressUpdateAddress,
                }}
                size='small'
                full
              >
                Нет
              </Button>
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
            </Flex>
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <Text title center>
              Укажите ваш адрес доставки
            </Text>
            <Button
              type='primary'
              full
              btnProps={{ onPress: onPressUpdateAddress }}
              children={'Перейти'}
            ></Button>
          </View>
        )}
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
