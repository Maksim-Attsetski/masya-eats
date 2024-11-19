import { Service } from '@/global';
import { useRestaurantStore } from './store';
import { IRestaurant } from './types';

const restaurantService = new Service('restaurants');

export const useRestaurant = () => {
  const store = useRestaurantStore();

  const onGetRestaurants = async () => {
    try {
      store.setIsLoading(true);

      const { data, error } = await restaurantService.getAll<IRestaurant>();

      if (error) throw new Error(error.message);

      data && store.setRestaurants(data);
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onCreateRestaurant = async (newValue: IRestaurant) => {
    try {
      store.setIsLoading(true);

      const { data, error } = await restaurantService.create<IRestaurant>(
        newValue
      );

      if (error) throw new Error(error.message);

      data?.[0] && store.addRestaurant(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onUpdateRestaurant = async (newValue: IRestaurant) => {
    try {
      if (!newValue?.id) throw new Error('id is required');
      store.setIsLoading(true);

      const { data, error } = await restaurantService.update<IRestaurant>(
        newValue.id,
        newValue
      );

      if (error) throw new Error(error.message);

      store.updateRestaurant(newValue);
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const onDeleteRestaurant = async (id: string) => {
    try {
      store.setIsLoading(true);

      const { error } = await restaurantService.delete(id);

      if (error) throw new Error(error.message);

      store.deleteRestaurant(id);
    } catch (error) {
      console.error(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  return {
    restaurants: store.restaurants,
    restaurantsLoading: store.isLoading,
    setRestaurantsLoading: store.setIsLoading,
    onGetRestaurants,
    onCreateRestaurant,
    onUpdateRestaurant,
    onDeleteRestaurant,
  };
};
