import { create } from 'zustand';
import { LocationObject } from 'expo-location';

export interface IPermissions {
  location: LocationObject | null;
  notification: boolean;
}

type TStrNull = string | null;

interface IGlobalStore {
  plusModal: boolean;
  token: TStrNull;
  setPlusModal: (v?: boolean) => void;
  permissions: IPermissions;
  setPermissions: (v: IPermissions) => void;
  setToken: (v: TStrNull) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  permissions: {
    location: null,
    notification: false,
  },
  token: null,
  plusModal: false,
  setToken: (token) => set({ token }),
  setPlusModal: (v) => set((state) => ({ plusModal: v ?? !state.plusModal })),
  setPermissions: (v) =>
    set((state) => ({ permissions: { ...state.permissions, ...v } })),
}));
