export type TWantTo = 'order' | 'go';

export interface ICollection {
  id: string;
  user_id: string;
  created_at: string;
  title: string;
  description: string;
  want_to: TWantTo;
  is_visible: boolean;
  rest_ids: number[];
}
