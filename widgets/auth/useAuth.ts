import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { supabase } from '@/global';
import { useAuthStore } from './store';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const useAuth = () => {
  const { user, setUser } = useAuthStore();

  const onLogin = async (credentials: SignInWithPasswordCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        credentials
      );

      if (error) throw new Error(error?.message);

      if (data.session) {
        await useAsyncStorage('access_token').setItem(
          data?.session?.access_token
        );
        await useAsyncStorage('refresh_token').setItem(
          data?.session?.refresh_token
        );
      }
      setUser(data.user);
    } catch (error: any) {
      Alert.alert(error ?? 'Ошибка' + JSON.stringify(error));
      console.error(error);
    }
  };

  const onSignup = async (credentials: SignUpWithPasswordCredentials) => {
    try {
      const { data, error } = await supabase.auth.signUp(credentials);

      if (error) throw new Error(error?.message);

      if (data.session) {
        await useAsyncStorage('access_token').setItem(
          data?.session?.access_token
        );
      }

      setUser(data.user);
    } catch (error: any) {
      Alert.alert(error?.message ?? 'Ошибка' + JSON.stringify(error));
      console.error(error);
    }
  };

  const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.replace('/(auth)/auth-base');
    } catch (error: any) {
      Alert.alert(error?.message ?? 'Ошибка' + JSON.stringify(error));
      console.error(error);
    }
  };

  return { user, setUser, onLogout, onLogin, onSignup };
};
