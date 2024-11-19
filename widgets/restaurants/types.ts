export interface IRestaurant {
  id: string;
  created_at: string;
  name: string;
  weight: string;
  preview: string | null;
  description: string;
  public_id: string;
  delivery_time: [number, number];
  address: string[];
  tags: string[];
  avarage_cost: number;
  news: string[];
  delivery_cost: number;
  rating: { rate: number; user_id: string }[] | null;
}
