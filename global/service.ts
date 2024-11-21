import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';

export class Service {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getAll<T>(): Promise<PostgrestSingleResponse<T[]>> {
    const res = await supabase.from(this.url).select('*');
    return res;
  }

  async getBy<T>(
    user_id: string,
    by?: keyof T
  ): Promise<PostgrestSingleResponse<T[]>> {
    const res = await supabase
      .from(this.url)
      .select('*')
      .eq((by ?? 'user_id') as string, user_id);
    return res;
  }
  async create<T>(data: T): Promise<PostgrestSingleResponse<T[]>> {
    const res = await supabase.from(this.url).insert([data]).select();
    return res;
  }
  async update<T>(id: string, data: T): Promise<PostgrestSingleResponse<null>> {
    const res = await supabase.from(this.url).update(data).eq('id', id);
    return res;
  }
  async delete(id: string): Promise<PostgrestSingleResponse<null>> {
    const res = await supabase.from(this.url).delete().eq('id', id);
    return res;
  }
}
