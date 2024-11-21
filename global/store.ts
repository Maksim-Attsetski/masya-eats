import { create } from 'zustand';
import { LocationObject } from 'expo-location';

export interface IPermissions {
  location: LocationObject | null;
}

interface IGlobalStore {
  plusModal: boolean;
  setPlusModal: (v?: boolean) => void;
  permissions: IPermissions;
  setPermissions: (v: IPermissions) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  permissions: {
    location: null,
  },
  plusModal: false,
  setPlusModal: (v) => set((state) => ({ plusModal: v ?? !state.plusModal })),
  setPermissions: (v) =>
    set((state) => ({ permissions: { ...state.permissions, ...v } })),
}));
