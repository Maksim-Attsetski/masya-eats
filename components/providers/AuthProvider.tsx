import React, { FC, memo, PropsWithChildren, useEffect, useState } from 'react';

import { supabase } from '@/global';
import { useAuth } from '@/widgets';
import { useBin, useDelivery } from '@/widgets/delivery';
import { LoadingView } from '../ui';
import { useOrder } from '@/widgets/order';
import { useRestaurant } from '@/widgets/restaurants';
import { useAsyncStorage } from '@/hooks';
import { useCollection } from '@/widgets/collections';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const { onGetBin } = useBin();
  const { onGetDelivery, deliveryLoading } = useDelivery();
  const { onGetOrders } = useOrder();
  const { onGetRestaurants } = useRestaurant();
  const { onGetCollections } = useCollection();

  useEffect(() => {
    (async () => {
      try {
        const token = await useAsyncStorage('token').getItem();
        if (token) {
          const response = await supabase.auth.setSession(token);
          const { user } = response.data;

          setUser(user);
          if (user) {
            await onGetDelivery(user?.id);
            await onGetCollections(user?.id);
            await onGetOrders(user?.id);
          }
        }
        await onGetBin();
        await onGetRestaurants();
      } catch (error: any) {
        console.error('error', error?.message ?? error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <LoadingView initial loading={loading || deliveryLoading} />
      {children}
    </>
  );
};

export default memo(AuthProvider);
