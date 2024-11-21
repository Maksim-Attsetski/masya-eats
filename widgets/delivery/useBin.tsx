import { useDeliveryStore } from './store';
import { IBin, IDelivery } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBin = () => {
  const { setIsLoading, delivery, setDelivery, isLoading } = useDeliveryStore();

  const onBinItemsUpdate = async (newItem: IBin) => {
    try {
      setIsLoading(true);

      const alreadyInBin = delivery.bin.findIndex(
        (v) => v.offer_id === newItem.offer_id
      );

      if (alreadyInBin === -1) {
        const newItemsInBin = [...delivery.bin, newItem];
        const updatedDelivery = { ...delivery, bin: newItemsInBin };

        setDelivery(updatedDelivery);
        await AsyncStorage.setItem('delivery', JSON.stringify(updatedDelivery));
        return;
      }

      delivery.bin.splice(alreadyInBin, 1, newItem);

      setDelivery({ bin: delivery.bin } as IDelivery);
      await AsyncStorage.setItem('delivery', JSON.stringify({ ...delivery }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRemoveItemsFromBin = async (id: string) => {
    try {
      setIsLoading(true);

      const newItems = delivery.bin.filter((item) => item.offer_id !== id);
      setDelivery({ bin: newItems } as IDelivery);
      await AsyncStorage.setItem(
        'delivery',
        JSON.stringify({ ...delivery, bin: newItems })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bin: delivery.bin,
    binLoading: isLoading,
    setBinLoading: setIsLoading,
    onBinItemsUpdate,
    onRemoveItemsFromBin,
  };
};
