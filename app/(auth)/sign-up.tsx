import React, { memo, useState } from 'react';

import { router } from 'expo-router';

import { Button, Flex, Gap, Input, MiniHeader } from '@/components';

const SignUp = () => {
  const [name, setName] = useState<string>('');

  const onContinue = async () => {
    router.push({
      pathname: '/(auth)/sign-up-detail',
      params: { name },
    });
  };

  return (
    <>
      <MiniHeader title='Введите ваше имя' />
      <Gap y={12} />

      <Input
        title='Имя'
        inputProps={{
          onChangeText: setName,
          value: name,
          maxLength: 20,
        }}
      />
      <Gap y={12} />

      <Flex toDown>
        <Button full type='primary' btnProps={{ onPress: onContinue }}>
          Продолжить
        </Button>
      </Flex>
      <Gap />
    </>
  );
};

export default memo(SignUp);
