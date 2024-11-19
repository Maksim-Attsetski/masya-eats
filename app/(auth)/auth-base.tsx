import React, { memo } from 'react';

import { StyleSheet } from 'react-native';

import { Button, Flex, Gap, Text } from '@/components';

const AuthBase = () => {
  return (
    <>
      <Gap y={50} />
      <Text title>Добро пожаловать!</Text>
      <Gap y={24} />
      <Flex toDown>
        <Button full type='primary' to={'/(auth)/sign-up'}>
          Регистрация
        </Button>
        <Button full type='secondary' to={'/(auth)/login'}>
          Войти
        </Button>
      </Flex>
    </>
  );
};

export default memo(AuthBase);
