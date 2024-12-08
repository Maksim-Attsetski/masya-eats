import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage(key: string) {
  return {
    getItem: async () => {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    setItem: async (value: any) =>
      await AsyncStorage.setItem(key, JSON.stringify(value)),
    removeItem: async () => await AsyncStorage.removeItem(key),
  };
}
