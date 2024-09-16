import { fetchAllCategories, ICategory } from '@/shared/api';

async function getFilterCategories(): Promise<ICategory[]> {
  return await fetchAllCategories();
}

export { getFilterCategories };
