import { IOrder } from '@/widgets/order';

export const checkOrderProgress = (order?: IOrder) => {
  const date = new Date().getTime();
  const orderDate = new Date(order?.created_at ?? 0).getTime();

  const orderDateShouldDone = orderDate - (order?.delivery_time ?? 0) * 60000;
  const result = (date / orderDateShouldDone) * 100;

  return result >= 100 ? 100 : result;
};
