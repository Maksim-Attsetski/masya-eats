import { useDeliveryStore } from './store';
import { IDelivery, IPromoCode } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useDelivery = () => {
  const store = useDeliveryStore();

  const onGetDelivery = async () => {
    try {
      store.setIsLoading(true);

      const stringData = await AsyncStorage.getItem('delivery');

      if (stringData) {
        const delivery = JSON.parse(stringData);
        store.setDelivery(delivery);
      }
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
        const newItems = store.delivery.promo_codes.filter(
          (item) => item.id !== newItem?.id
        );
        store.setDelivery({ promo_codes: newItems } as IDelivery);
        await AsyncStorage.setItem('delivery', JSON.stringify(newItems));
        return;
      }

      const isExist = store.delivery.promo_codes.findIndex(
        (v) => v.id === newItem.id
      );

      if (isExist === -1) {
        const newItems = [...store.delivery.promo_codes, newItem];
        store.setDelivery({ promo_codes: newItems } as IDelivery);
        await AsyncStorage.setItem('delivery', JSON.stringify(newItems));
        return;
      }

      store.delivery.promo_codes.splice(isExist, 1, newItem);

      store.setDelivery({
        promo_codes: store.delivery.promo_codes,
      } as IDelivery);
      await AsyncStorage.setItem('delivery', JSON.stringify(store.delivery));
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onUpdateOrderTime = async (newTime: string) => {
    store.setDelivery({ orderTime: newTime } as IDelivery);
    await AsyncStorage.setItem(
      'delivery',
      JSON.stringify({ ...store.delivery, order: newTime })
    );
  };

  const onUpdateDelivery = async (newDelivery: IDelivery) => {
    store.setDelivery(newDelivery);
    await AsyncStorage.setItem('delivery', JSON.stringify({ ...newDelivery }));
  };

  return {
    delivery: store.delivery,
    deliveryLoading: store.isLoading,
    setDeliveryLoading: store.setIsLoading,
    onGetDelivery,
    onUpdatePromoCodes,
    onUpdateOrderTime,
    onUpdateDelivery,
  };
};
