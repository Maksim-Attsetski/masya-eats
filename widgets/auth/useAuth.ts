import { supabase } from '@/global';
import { useAuthStore } from './store';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useAsyncStorage } from '@/hooks';

export const useAuth = () => {
  const { user, setUser } = useAuthStore();

  const onLogin = async (credentials: SignInWithPasswordCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        credentials
      );

      if (error) throw new Error(error?.message);

      if (data.session) {
        const tokenData = {
          access_token: data?.session.access_token,
          refresh_token: data?.session.refresh_token,
        };

        await useAsyncStorage('token').setItem(tokenData);
        await useAsyncStorage('token').setItem(tokenData);
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
        const tokenData = {
          access_token: data?.session.access_token,
          refresh_token: data?.session.refresh_token,
        };

        await useAsyncStorage('token').setItem(tokenData);
        await useAsyncStorage('token').setItem(tokenData);
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
      await useAsyncStorage('token').removeItem();
      setUser(null);
      router.replace('/(auth)/auth-base');
    } catch (error: any) {
      Alert.alert(error?.message ?? 'Ошибка' + JSON.stringify(error));
      console.error(error);
    }
  };

  return { user, setUser, onLogout, onLogin, onSignup };
};
