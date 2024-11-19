import { create } from 'zustand';
import { IRestaurant } from './types';

interface IRestaurantStore {
  restaurants: IRestaurant[];
  isLoading: boolean;
  setIsLoading: (v?: boolean) => void;
  setRestaurants: (r: IRestaurant[]) => void;
  addRestaurant: (r: IRestaurant) => void;
  updateRestaurant: (r: IRestaurant) => void;
  deleteRestaurant: (id: string) => void;
}

export const useRestaurantStore = create<IRestaurantStore>((set) => ({
  restaurants: [],
  isLoading: false,
  setIsLoading: (v) => set((state) => ({ isLoading: v ?? !state.isLoading })),
  setRestaurants: (restaurants) => set({ restaurants }),
  addRestaurant: (newRestaurant) =>
    set((state) => ({ restaurants: [...state.restaurants, newRestaurant] })),
  updateRestaurant: (restaurant) =>
    set((state) => ({
      restaurants: [...state.restaurants].map((item) =>
        item?.id === restaurant.id ? { ...item, ...restaurant } : item
      ),
    })),
  deleteRestaurant: (id) =>
    set((state) => ({
      restaurants: [...state.restaurants].filter((item) => item?.id !== id),
    })),
}));
