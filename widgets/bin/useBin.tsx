import { useBinStore } from './store';
import { IBin } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBin = () => {
  const store = useBinStore();

  const onGetBinItems = async () => {
    try {
      store.setIsLoading(true);

      const stringData = await AsyncStorage.getItem('bin');

      if (!stringData) {
        store.setBin({ items: [], orderTime: '' });
      } else {
        const bin = JSON.parse(stringData);
        store.setBin(bin);
      }
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onBinItemsUpdate = async (newItem: IBin['items'][0]) => {
    try {
      store.setIsLoading(true);

      const alreadyInBin = store.bin.items.findIndex(
        (v) => v.offer_id === newItem.offer_id
      );

      if (alreadyInBin === -1) {
        const newItems = [...store.bin.items, newItem];
        store.setBin({ items: newItems, orderTime: store.bin.orderTime });
        await AsyncStorage.setItem('bin', JSON.stringify(newItems));
        return;
      }

      store.bin.items.splice(alreadyInBin, 1, newItem);

      store.setBin({ items: store.bin.items, orderTime: store.bin.orderTime });
      await AsyncStorage.setItem('bin', JSON.stringify(store.bin.items));
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onRemoveItemsFromBin = async (id: string) => {
    try {
      store.setIsLoading(true);

      const newItems = store.bin.items.filter((item) => item.offer_id !== id);
      store.setBin({ items: newItems, orderTime: store.bin.orderTime });
      await AsyncStorage.setItem('bin', JSON.stringify(newItems));
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  return {
    bin: store.bin,
    binLoading: store.isLoading,
    setBinLoading: store.setIsLoading,
    onBinItemsUpdate,
    onRemoveItemsFromBin,
  };
};
