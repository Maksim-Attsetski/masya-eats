import React, { memo, useMemo, useState } from 'react';

import { Button, Flex, Gap, Input, MiniHeader } from '@/components';
import { useAuth } from '@/widgets';
import { router } from 'expo-router';

const Login = () => {
  const { onLogin } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const isFormValid = useMemo(() => {
    return (
      // other errors checking in supabase
      (email.length > 0 && email.length <= 50) ||
      (pass.length > 6 && pass.length <= 20)
    );
  }, [email, pass]);

  const onSubmit = async () => {
    if (isFormValid) {
      await onLogin({ email, password: pass });
      router.replace('/(routes)');
    }
  };

  return (
    <>
      <MiniHeader title='Войди в свой аккаунт' />

      <Gap y={20} />

      <Input
        title='E-mail'
        inputProps={{
          keyboardType: 'email-address',
          onChangeText: setEmail,
          value: email,
        }}
      />
      <Input
        title='Пароль'
        inputProps={{
          keyboardType: 'visible-password',
          onChangeText: setPass,
          value: pass,
        }}
      />

      <Gap y={12} />

      <Flex toDown>
        <Button
          type='primary'
          full
          btnProps={{ onPress: onSubmit, disabled: !isFormValid }}
        >
          Продолжить
        </Button>
      </Flex>
      <Gap />
    </>
  );
};

export default memo(Login);
