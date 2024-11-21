import React, { FC, memo, PropsWithChildren, useEffect, useState } from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import { supabase } from '@/global';
import { useAuth } from '@/widgets';
import { useBin, useDelivery } from '@/widgets/delivery';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const { onGetBin } = useBin();
  const { onGetDelivery } = useDelivery();

  useEffect(() => {
    (async () => {
      try {
        const access_token = await useAsyncStorage('access_token').getItem();

        if (access_token) {
          const res = await supabase.auth.getUser(access_token);
          const { user } = res.data;
          setUser(user);

          console.log('user', user);

          if (user) {
            onGetBin();
            onGetDelivery(user?.id);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading && (
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255,0.95)',
            zIndex: 9999,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator
            style={{ transform: [{ scale: 6 }] }}
            size={'small'}
          />
        </View>
      )}
      {children}
    </>
  );
};

export default memo(AuthProvider);
