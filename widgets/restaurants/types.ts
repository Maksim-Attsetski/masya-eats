export interface IRestLocation {
  address: string;
  work_from: number;
  work_until: number;
}

// #TODO create this interface
// add banners to home screen
export interface IRestPromotion {
  title: string;
  description: string;
  preview: boolean; //  если true, то на сервере есть превью этой акции и надо ее отобразить в баннере
  order_greater: number; // срабатывает при заказе выше .... р
  discount_value: number; // размер скидки
  discount_type: number; // в % или бунах
  rest_id: string; // по этому id будем переходить
  isFullScreen: boolean;
}

export interface IRestaurant {
  id: string;
  created_at: string;
  name: string;
  preview: string | null;
  description: string;
  public_id: string;
  delivery_time: [number, number];
  locations: IRestLocation[];
  promotions: IRestPromotion[];
  avarage_cost: number; // ср чек -> 1 = $ -> 2 = $$ -> 3 = $$$
  delivery_cost: number; // стоимость доставки
  free_delivery_from: number; // бесплатная доставка от ...
  rating: { rate: number; user_id: string }[] | null;
}
