import { LatLng } from 'react-native-maps';
import { IRestaurantOffer } from '../restaurant-offer';
import { IBin } from '../delivery';

export type TPaymentType = 'card' | 'card_courier' | 'cash';

export interface IOrder<T = IBin> {
  id: string;
  public_id: number;
  user_id: string;
  from: string;
  to: string;
  price: number;
  paymaent_type: TPaymentType;
  discount: number;
  delivery_time: number;
  progress: number;
  created_at: number;
  products: T[];
}

export type TRestOrder = IOrder<IRestaurantOffer>;
