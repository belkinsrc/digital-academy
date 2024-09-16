import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductState {
  products: string[];
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  clearStore: () => void;
}

const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (product) =>
        set((state) => ({
          products: state.products.filter((prdt) => prdt !== product),
        })),
      clearStore: () => set({ products: [] }),
    }),
    {
      name: 'product-storage',
    }
  )
);

interface CategoryState {
  activeCategory: string;
  setActive: (category: string) => void;
}

const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      activeCategory: 'all',
      setActive: (category) => {
        set((state) => ({
          ...state,
          activeCategory: category,
        }));
      },
    }),
    {
      name: 'category-storage',
    }
  )
);

export { useProductStore, useCategoryStore };
