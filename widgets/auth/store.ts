import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface IAuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
