import { orderService } from './service';
import { useOrderStore } from './store';
import { IOrder } from './types';

export const useOrder = () => {
  const { orders, createOrder, doneOrder, setOrders } = useOrderStore();

  const onGetOrders = async () => {
    try {
      const data = await orderService.getAll<IOrder>();

      if (data.error) throw new Error(data.error?.message);

      data.data && setOrders(data.data);
    } catch (error: any) {
      console.log(error?.message ?? error);
    }
  };

  const onAddOrder = async (order: IOrder) => {
    try {
      const data = await orderService.create<IOrder>(order);
      console.log(data);

      if (data.error) throw new Error(data.error?.message);

      console.log('order', data.data);

      if (data.data[0]) {
        createOrder(data.data[0]);
      } else {
        throw new Error('Ошибка');
      }
    } catch (error: any) {
      console.log('error', error?.message ?? error);
    }
  };

  const onDoneOrder = async (id: string) => {
    try {
      const data = await orderService.delete(id);

      if (data.error) throw new Error(data.error?.message);

      doneOrder(id);
    } catch (error: any) {
      console.log(error?.message ?? error);
    }
  };

  return {
    orders,
    onGetOrders,
    onAddOrder,
    onDoneOrder,
  };
};
