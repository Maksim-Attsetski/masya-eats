import { collectionService } from './service';
import { useCollectionStore } from './store';
import { ICollection } from './types';
import { useAuth } from '../auth';

export const useCollection = () => {
  const {
    collections,
    collectionsLoading,
    createCollection,
    deleteCollection,
    setCollections,
    editCollection,
    setCollectionsLoading,
  } = useCollectionStore();

  const { user } = useAuth();

  const onGetCollections = async (id?: string) => {
    if (id || user?.id) {
      try {
        setCollectionsLoading(true);
        const data = await collectionService.getBy<ICollection>(
          id ?? user?.id ?? '',
          'user_id'
        );

        if (data.error) throw new Error(data.error?.message);

        data.data && setCollections(data.data);
      } catch (error: any) {
        console.error(error?.message ?? error);
      } finally {
        setCollectionsLoading(false);
      }
    }
  };

  const onAddCollection = async (order: ICollection) => {
    try {
      setCollectionsLoading(true);

      const data = await collectionService.create<ICollection>(order);
      if (data.error) throw new Error(data.error?.message);
      if (data.data[0]) {
        createCollection(data.data[0]);
      } else {
        throw new Error('Ошибка');
      }
    } catch (error: any) {
      console.error('error', error?.message ?? error);
    } finally {
      setCollectionsLoading(false);
    }
  };

  const onDeleteCollection = async (id: string) => {
    try {
      setCollectionsLoading(true);
      const data = await collectionService.delete(id);

      if (data.error) throw new Error(data.error?.message);

      deleteCollection(id);
    } catch (error: any) {
      console.error(error?.message ?? error);
    } finally {
      setCollectionsLoading(false);
    }
  };

  const onEditCollection = async (col: ICollection) => {
    try {
      setCollectionsLoading(true);
      const data = await collectionService.update(col.id, col);

      if (data.error) throw new Error(data.error?.message);

      editCollection(col);
    } catch (error: any) {
      console.error(error?.message ?? error);
    } finally {
      setCollectionsLoading(false);
    }
  };

  return {
    collections,
    collectionsLoading,
    onGetCollections,
    onAddCollection,
    onDeleteCollection,
    onEditCollection,
  };
};
