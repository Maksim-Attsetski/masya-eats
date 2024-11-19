import React, { memo, useMemo, useState } from 'react';

import { Button, Gap, Input, Text } from '@/components';
import { useAuth } from '@/widgets';

const SignUp = () => {
  const { onSignup } = useAuth();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const isFormValid = useMemo(() => {
    return (
      // other errors checking in supabase
      (name.length > 0 && name.length <= 50) ||
      (email.length > 0 && email.length <= 50) ||
      (pass.length > 6 && pass.length <= 20)
    );
  }, [name, email, pass]);

  const onSubmit = async () => {
    if (isFormValid) {
      await onSignup({
        email,
        password: pass,
        options: { data: { name } },
      });
    }
  };

  return (
    <>
      <Button to={'../'}>Назад</Button>

      <Gap y={20} />
      <Text title>Создай свой аккаунт</Text>
      <Gap y={12} />

      <Input
        title='Имя'
        inputProps={{
          onChangeText: setName,
          value: name,
        }}
      />
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

export default memo(SignUp);
