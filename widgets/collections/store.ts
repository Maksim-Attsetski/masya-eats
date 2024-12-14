import { create } from 'zustand';
import { ICollection } from './types';

interface ICollectionStore {
  collections: ICollection[];
  collectionsLoading: boolean;
  setCollectionsLoading: (v?: boolean) => void;
  setCollections: (cols: ICollection[]) => void;
  createCollection: (col: ICollection) => void;
  editCollection: (col: ICollection) => void;
  deleteCollection: (id: string) => void;
}

export const useCollectionStore = create<ICollectionStore>((use) => ({
  collections: [],
  collectionsLoading: false,
  setCollectionsLoading: (value) =>
    use((s) => ({ ...s, collectionsLoading: value ?? !s.collectionsLoading })),
  setCollections: (cols) => use((s) => ({ ...s, collections: cols })),
  createCollection: (col) =>
    use((s) => ({ ...s, collections: [...s.collections, col] })),
  editCollection: (collection) =>
    use((s) => ({
      ...s,
      collections: [...s.collections].map((col) =>
        col.id === collection.id ? { ...col, ...collection } : col
      ),
    })),
  deleteCollection: (id) =>
    use((s) => ({
      ...s,
      collections: [...s.collections].filter((o) => o.id !== id),
    })),
}));
