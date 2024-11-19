import React, { memo, useRef } from 'react';

import { Button, Gap, MiniHeader, Text } from '@/components';
import { ChooseAuthTypeModal } from '@/widgets';
import BottomSheet from '@gorhom/bottom-sheet';

const AuthBase = () => {
  const ref = useRef<BottomSheet>(null);
  return (
    <>
      <MiniHeader title='Профиль' />
      <Gap y={24} />
      <Text title>Авторизуйтесь</Text>
      <Gap y={4} />
      <Text>Чтобы заказывать еду, продукты, вещи для дома и многое другое</Text>
      <Gap />
      <Button
        type='primary'
        btnProps={{ onPress: () => ref.current?.snapToIndex(0) }}
      >
        Войти
      </Button>
      <ChooseAuthTypeModal bottomSheetRef={ref} />
    </>
  );
};

export default memo(AuthBase);
