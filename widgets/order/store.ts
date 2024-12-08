import { create } from 'zustand';
import { IOrder } from './types';

interface IOrderStore {
  orders: IOrder[];
  setOrders: (orders: IOrder[]) => void;
  createOrder: (order: IOrder) => void;
  doneOrder: (id: string) => void;
}

export const useOrderStore = create<IOrderStore>((use) => ({
  orders: [],
  setOrders: (orders) => use((s) => ({ ...s, orders })),
  createOrder: (order) => use((s) => ({ ...s, orders: [...s.orders, order] })),
  doneOrder: (id) =>
    use((s) => ({ ...s, orders: [...s.orders].filter((o) => o.id !== id) })),
}));
