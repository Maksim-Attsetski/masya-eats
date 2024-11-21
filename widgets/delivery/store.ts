import { create } from 'zustand';
import { IDelivery } from './types';

interface IDeliveryStore {
  delivery: IDelivery;
  isLoading: boolean;
  setIsLoading: (v?: boolean) => void;
  setDelivery: (v: IDelivery) => void;
}

export const useDeliveryStore = create<IDeliveryStore>((set) => ({
  delivery: {
    bin: [],
    adresses: [],
    orderTime: '',
    promo_codes: [],
  },
  isLoading: false,
  setIsLoading: (v) => set((state) => ({ isLoading: v ?? !state.isLoading })),
  setDelivery: (delivery) =>
    set((state) => ({ delivery: { ...state.delivery, ...delivery } })),
}));
