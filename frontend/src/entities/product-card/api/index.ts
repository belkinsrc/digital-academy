import { fetchProducts, fetchProductsById, fetchPopularProducts, IProduct, IProductFetchBody } from '@/shared/api';

async function getProductsByCategory(category: string): Promise<IProduct[]> {
  return await fetchProducts({ category });
}

async function getProductsById(options: IProductFetchBody): Promise<IProduct[]> {
  return await fetchProductsById(options);
}

async function getPopularProducts(): Promise<IProduct[]> {
  return await fetchPopularProducts();
}

export { getProductsByCategory, getProductsById, getPopularProducts };
