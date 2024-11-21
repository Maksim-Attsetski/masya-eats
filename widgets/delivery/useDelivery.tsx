import { Service } from '@/global';
import { useDeliveryStore } from './store';
import { IDelivery, IPromoCode } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../auth';

const deliveryService = new Service('delivery');

export const useDelivery = () => {
  const store = useDeliveryStore();

  const onGetDelivery = async (user_id: string) => {
    try {
      store.setIsLoading(true);

      const { data, error } = await deliveryService.getBy<IDelivery>(user_id);

      console.log('LOG: Delivery was getted sucessfully', data);
      if (error) throw new Error(error.message);

      data?.[0] && store.setDelivery(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onUpdatePromoCodes = async (
    newItem: IPromoCode,
    isRemoveAction: boolean = false
  ) => {
    try {
      store.setIsLoading(true);

      if (isRemoveAction) {
        const newItems = store.delivery?.promo_codes.filter(
          (item) => item.id !== newItem?.id
        );
        await onUpdateDelivery({
          promo_codes: newItems,
          id: store?.delivery?.id,
        } as IDelivery);
        return;
      }

      const isExist =
        store.delivery?.promo_codes.findIndex((v) => v.id === newItem.id) ?? -1;

      if (isExist === -1) {
        const newItems = [...(store.delivery?.promo_codes ?? []), newItem];
        await onUpdateDelivery({
          promo_codes: newItems,
          id: store?.delivery?.id,
        } as IDelivery);
        return;
      }

      store.delivery?.promo_codes.splice(isExist, 1, newItem);

      await onUpdateDelivery({
        promo_codes: store.delivery?.promo_codes,
        id: store?.delivery?.id,
      } as IDelivery);
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onUpdateDelivery = async (newDelivery: IDelivery) => {
    if (!store?.delivery?.id) return;
    store.setDelivery(newDelivery);
    deliveryService.update(store?.delivery?.id, newDelivery);
  };

  const onAddUserLocationToAddress = async (address: string) => {
    const isExist = store.delivery?.adresses.find((v) =>
      v.address.includes(address)
    );
    console.log(isExist, address, store?.delivery?.adresses);

    !isExist &&
      store.setDelivery({
        adresses: [
          ...(store.delivery?.adresses ?? []),
          {
            address,
            apartment: 1,
            id: 'no_id',
            promo_codes: [],
            orderTime: 'ASAP',
            bin: [],
            created_at: new Date().toISOString(),
            user_id: 'no_user',
          },
        ],
      } as IDelivery);
  };

  const onUpdateOrderTime = async (newTime: string) => {
    await onUpdateDelivery({ orderTime: newTime } as IDelivery);
  };

  return {
    delivery: store.delivery,
    deliveryLoading: store.isLoading,
    setDeliveryLoading: store.setIsLoading,
    onGetDelivery,
    onUpdatePromoCodes,
    onUpdateOrderTime,
    onUpdateDelivery,
    onAddUserLocationToAddress,
  };
};
