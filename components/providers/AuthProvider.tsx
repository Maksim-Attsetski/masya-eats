import React, { FC, memo, PropsWithChildren, useEffect, useState } from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import { supabase } from '@/global';
import { useAuth } from '@/widgets';
import { useBin, useDelivery } from '@/widgets/delivery';
import { LoadingView } from '../ui';
import { useOrder } from '@/widgets/order';
import { useRestaurant } from '@/widgets/restaurants';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const { onGetBin } = useBin();
  const { onGetDelivery, deliveryLoading } = useDelivery();
  const { onGetOrders } = useOrder();
  const { onGetRestaurants } = useRestaurant();

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
            await onGetDelivery(user?.id);
            await onGetOrders(user?.id);
            await onGetBin();
          }
        }
        await onGetRestaurants();
      } catch (error: any) {
        console.error('error', error?.message ?? error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <LoadingView initial loading={loading || deliveryLoading}>
      {children}
    </LoadingView>
  );
};

export default memo(AuthProvider);
