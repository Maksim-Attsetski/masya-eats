import { useState } from 'react';
import { orderService } from './service';
import { useOrderStore } from './store';
import { IOrder } from './types';
import { useAuth } from '../auth';

export const useOrder = () => {
  const {
    orders,
    createOrder,
    doneOrder,
    setOrders,
    orderLoading,
    setOrderLoading,
  } = useOrderStore();

  const { user } = useAuth();

  const onGetOrders = async (id?: string) => {
    if (id || user?.id) {
      try {
        setOrderLoading(true);
        const data = await orderService.getBy<IOrder>(
          id ?? user?.id ?? '',
          'user_id'
        );

        if (data.error) throw new Error(data.error?.message);

        data.data && setOrders(data.data);
      } catch (error: any) {
        console.error(error?.message ?? error);
      } finally {
        setOrderLoading(false);
      }
    }
  };

  const onAddOrder = async (order: IOrder) => {
    try {
      setOrderLoading(true);

      const data = await orderService.create<IOrder>(order);
      if (data.error) throw new Error(data.error?.message);
      if (data.data[0]) {
        createOrder(data.data[0]);
      } else {
        throw new Error('Ошибка');
      }
    } catch (error: any) {
      console.error('error', error?.message ?? error);
    } finally {
      setOrderLoading(false);
    }
  };

  const onDoneOrder = async (id: string) => {
    try {
      setOrderLoading(true);
      const data = await orderService.delete(id);

      if (data.error) throw new Error(data.error?.message);

      doneOrder(id);
    } catch (error: any) {
      console.error(error?.message ?? error);
    } finally {
      setOrderLoading(false);
    }
  };

  return {
    orders,
    orderLoading,
    onGetOrders,
    onAddOrder,
    onDoneOrder,
  };
};
