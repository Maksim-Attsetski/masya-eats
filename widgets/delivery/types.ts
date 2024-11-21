export interface IBin {
  offer_id: string;
  count: number;
}

export interface IPromoCode {
  id: string;
  text: string;
  image: string;
  title: string;
  description: string;
  public_id: string; // id, по которому его будут использовать
  discount: number; // сколько рублей скидка
  work_until_price: number; // от сколько рублей активен
  expired_at: number;
}

export interface IAddress {
  id: string;
  address: string;
  main: boolean;
  name: string;
  entrance: number; // подъезд
  door_phone: number; // домофон
  floor: number; // этаж
  apartment: number; // квартира
  instruction: string; // инструкция для курьера
}

export interface IDelivery {
  id: string;
  promo_codes: IPromoCode[];
  orderTime: string;
  bin: IBin[];
  adresses: IAddress[];
  created_at: string;
  user_id: string;
}
