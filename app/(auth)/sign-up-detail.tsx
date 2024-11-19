import React, { memo, useMemo, useState } from 'react';

import { Button, Gap, Input, MiniHeader } from '@/components';
import { useAuth } from '@/widgets';
import { router, useLocalSearchParams } from 'expo-router';

const SignUp = () => {
  const { onSignup } = useAuth();
  const nameFromParams = useLocalSearchParams()?.name;
  const name =
    nameFromParams && nameFromParams.length > 0 ? nameFromParams : 'Пустое имя';

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const isFormValid = useMemo(() => {
    return (
      // other errors checking in supabase
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
      router.replace('/(routes)/index');
    }
  };

  return (
    <>
      <MiniHeader title={`Придумайте пароль, ${name}`} />

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
