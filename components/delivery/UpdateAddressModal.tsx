import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC, memo, RefObject, useMemo, useState } from 'react';
import { Button, Flex, Gap, Input, Text } from '../ui';
import { IAddress, useDelivery } from '@/widgets/delivery';
import { ContainerPadding, SCREEN_WIDTH } from '@/global';

interface IProps {
  initialAddress: IAddress;
  fromMap?: boolean;
  bottomSheetRef: RefObject<BottomSheet>;
}

const UpdateAddressModal: FC<IProps> = ({
  initialAddress,
  fromMap = false,
  bottomSheetRef,
}) => {
  const [address, setAddress] = useState<IAddress>(initialAddress);

  const { delivery, onAddUserLocationToAddress } = useDelivery();

  const onPressSaveButton = async () => {
    if (delivery) {
      await onAddUserLocationToAddress(address);
    }
  };

  const onPressAddButton = async () => {
    if (delivery) {
      const newAddress = {
        ...address,
        id: (address.address + address.name).replaceAll(' ', ''),
        main: true,
      } as IAddress;
      await onAddUserLocationToAddress(newAddress, true);
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        enableDynamicSizing
        enablePanDownToClose
        index={0}
      >
        <BottomSheetView
          style={{
            paddingHorizontal: ContainerPadding,
            maxWidth: SCREEN_WIDTH - 0.1,
          }}
        >
          <Text title center>
            Заполните дополнительные поля
          </Text>
          <Gap />
          <Flex justify='space-between'>
            <Input
              inputProps={{
                value: address.address,
                onChangeText: (v) =>
                  setAddress((prev) => ({ ...prev, address: v })),
                editable: !fromMap && address.address.length > 0,
              }}
              containerStyle={{ style: { flex: 3 } }}
              title='Адрес'
            />
            <Input
              inputProps={{
                value: address.name,
                onChangeText: (v) =>
                  setAddress((prev) => ({ ...prev, name: v })),
                editable: !fromMap && address.address.length > 0,
              }}
              containerStyle={{ style: { flex: 1 } }}
              title='Номер дома'
            />
            <Input
              inputProps={{
                keyboardType: 'numeric',
                value: address.apartment,
                onChangeText: (v) =>
                  setAddress((prev) => ({ ...prev, apartment: v })),
                placeholder: '0',
              }}
              containerStyle={{ style: { flex: 1 } }}
              title='Квартира'
            />
          </Flex>
          <Gap />
          <Flex justify='space-between'>
            <Input
              inputProps={{
                value: address.entrance,
                onChangeText: (v) =>
                  setAddress((prev) => ({ ...prev, entrance: v })),
                placeholder: '0',
              }}
              containerStyle={{ style: { flex: 1 } }}
              title='Подъезд'
            />
            <Input
              inputProps={{
                value: address.door_phone,
                placeholder: 'Отсутствует',
                onChangeText: (v) =>
                  setAddress((prev) => ({ ...prev, door_phone: v })),
              }}
              containerStyle={{ style: { flex: 1 } }}
              title='Домофон'
            />
            <Input
              inputProps={{
                value: address.floor,
                placeholder: '0',
                onChangeText: (v) =>
                  setAddress((prev) => ({ ...prev, floor: v })),
              }}
              containerStyle={{ style: { flex: 1 } }}
              title='Этаж'
            />
          </Flex>
          <Gap />

          <Input
            inputProps={{
              value: address.instruction,
              onChangeText: (v) =>
                setAddress((prev) => ({ ...prev, instruction: v })),
              multiline: true,
              numberOfLines: 7,
            }}
            title='Инструкция курьеру'
          />
          <Gap />
          <Button btnProps={{ onPress: onPressAddButton }}>
            Добавить как новый
          </Button>
          <Gap />
          <Button type='primary' btnProps={{ onPress: onPressSaveButton }}>
            Сохранить
          </Button>
          <Gap />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default memo(UpdateAddressModal);
