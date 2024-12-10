export interface IRestLocation {
  address: string;
  work_from: number;
  work_until: number;
}

export interface IRestaurant {
  id: string;
  created_at: string;
  name: string;
  weight: string;
  preview: string | null;
  description: string;
  public_id: string;
  delivery_time: [number, number];
  locations: IRestLocation[];
  tags: string[];
  avarage_cost: number;
  news: string[];
  delivery_cost: number;
  rating: { rate: number; user_id: string }[] | null;
}
