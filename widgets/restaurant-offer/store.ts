import { create } from 'zustand';
import { IRestaurantOffer } from './types';

interface IRestaurantOfferStore {
  restOffers: IRestaurantOffer[];
  isLoading: boolean;
  setIsLoading: (v?: boolean) => void;
  setRestOffers: (r: IRestaurantOffer[]) => void;
  addRestOffer: (r: IRestaurantOffer) => void;
  updateRestOffer: (r: IRestaurantOffer) => void;
  deleteRestOffer: (id: string) => void;
}

export const useRestOffersStore = create<IRestaurantOfferStore>((set) => ({
  restOffers: [],
  isLoading: false,
  setIsLoading: (v) => set((state) => ({ isLoading: v ?? !state.isLoading })),
  setRestOffers: (restaurants) => set({ restOffers: restaurants }),
  addRestOffer: (newRestOffer) =>
    set((state) => ({ restOffers: [...state.restOffers, newRestOffer] })),
  updateRestOffer: (restOffer) =>
    set((state) => ({
      restOffers: [...state.restOffers].map((item) =>
        item?.id === restOffer.id ? { ...item, ...restOffer } : item
      ),
    })),
  deleteRestOffer: (id) =>
    set((state) => ({
      restOffers: [...state.restOffers].filter((item) => item?.id !== id),
    })),
}));
