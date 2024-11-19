import React, { memo, useMemo, useState } from 'react';

import { Button, Gap, Input, Text } from '@/components';
import { useAuth } from '@/widgets';

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
    }
  };

  return (
    <>
      <Button to={'../'}>Назад</Button>

      <Gap y={20} />
      <Text style={{ fontSize: 32 }}>Войди в свой аккаунт</Text>
      <Gap y={12} />

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

      <Button
        type='primary'
        btnProps={{
          onPress: onSubmit,
          disabled: !isFormValid,
          style: { marginTop: 'auto' },
        }}
      >
        Продолжить
      </Button>
      <Gap />
    </>
  );
};

export default memo(Login);
