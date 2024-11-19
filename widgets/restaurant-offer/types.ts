export interface IKBJU {
  fat: number;
  kcal: number;
  protein: number;
  carbohydraties: number;
}

export interface IRestaurantOffer {
  id: string;
  created_at: string;
  name: string;
  weight: string;
  price: number;
  discount: number;
  preview: string | null;
  description: string;
  restaurant_id: string;
  genre: string;
  kbju: IKBJU;
  public_id: string;
}
