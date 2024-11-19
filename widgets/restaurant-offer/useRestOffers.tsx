import { Service } from '@/global';
import { useRestOffersStore } from './store';
import { IRestaurantOffer } from './types';

const restOffersService = new Service('restaurant-offer');

export const useRestOffers = () => {
  const store = useRestOffersStore();

  const onGetRestOffers = async (rest_id: string) => {
    try {
      store.setIsLoading(true);

      const { data, error } = await restOffersService.getBy<IRestaurantOffer>(
        rest_id,
        'restaurant_id'
      );

      if (error) throw new Error(error.message);

      data && store.setRestOffers(data);
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  return {
    restOffers: store.restOffers,
    restOffersLoading: store.isLoading,
    setRestOffersLoading: store.setIsLoading,
    onGetRestOffers,
  };
};
