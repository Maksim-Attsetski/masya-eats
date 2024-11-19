import { create } from 'zustand';

interface IGlobalStore {
  plusModal: boolean;
  setPlusModal: (v?: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  plusModal: false,
  setPlusModal: (v) => set((state) => ({ plusModal: v ?? !state.plusModal })),
}));
