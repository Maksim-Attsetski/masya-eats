import { create } from 'zustand';
import { IBin } from './types';

interface IBinStore {
  bin: IBin;
  isLoading: boolean;
  setIsLoading: (v?: boolean) => void;
  setBin: (v: IBin) => void;
}

export const useBinStore = create<IBinStore>((set) => ({
  bin: { items: [] },
  isLoading: false,
  setIsLoading: (v) => set((state) => ({ isLoading: v ?? !state.isLoading })),
  setBin: (bin) => set({ bin }),
}));
