import { useDeliveryStore } from './store';
import { IBin, IDelivery } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBin = () => {
  const { setIsLoading, delivery, setDelivery, isLoading } = useDeliveryStore();

  const onGetBin = async () => {
    try {
      setIsLoading(true);
      const binAsString = await AsyncStorage.getItem('bin');

      console.log(binAsString);

      if (binAsString) {
        const bin = JSON.parse(binAsString);
        console.log(bin);
        bin && setDelivery({ bin } as IDelivery);
      }
    } catch (error) {
      console.error('bin error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onBinItemsUpdate = async (newItem: IBin) => {
    try {
      if (!delivery) return;
      setIsLoading(true);

      const alreadyInBin = delivery?.bin?.findIndex(
        (v) => v.offer_id === newItem.offer_id
      );

      if (alreadyInBin === -1) {
        const newItemsInBin = [...delivery?.bin, newItem];
        const updatedDelivery = { ...delivery, bin: newItemsInBin };

        setDelivery(updatedDelivery);
        await AsyncStorage.setItem('bin', JSON.stringify(updatedDelivery.bin));
        return;
      }

      delivery?.bin?.splice(alreadyInBin, 1, newItem);

      setDelivery({ bin: delivery?.bin } as IDelivery);
      await AsyncStorage.setItem('bin', JSON.stringify(delivery.bin));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRemoveItemsFromBin = async (id: string) => {
    try {
      setIsLoading(true);

      const newItems = delivery?.bin?.filter((item) => item.offer_id !== id);
      setDelivery({ bin: newItems } as IDelivery);
      await AsyncStorage.setItem('bin', JSON.stringify(newItems));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bin: [...(delivery?.bin ?? [])],
    delivery,
    binLoading: isLoading,
    setBinLoading: setIsLoading,
    onGetBin,
    onBinItemsUpdate,
    onRemoveItemsFromBin,
  };
};
