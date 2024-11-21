import { create } from 'zustand';
import { IDelivery } from './types';

interface IDeliveryStore {
  delivery: IDelivery | null;
  isLoading: boolean;
  setIsLoading: (v?: boolean) => void;
  setDelivery: (v: IDelivery) => void;
}

export const useDeliveryStore = create<IDeliveryStore>((set) => ({
  delivery: {
    adresses: [],
    bin: [],
    id: 'no_id',
    created_at: new Date().toISOString(),
    orderTime: 'ASAP',
    promo_codes: [],
    user_id: 'no_user',
  },
  isLoading: false,
  setIsLoading: (v) => set((state) => ({ isLoading: v ?? !state.isLoading })),
  setDelivery: (delivery) =>
    set((state) => ({ delivery: { ...state.delivery, ...delivery } })),
}));
