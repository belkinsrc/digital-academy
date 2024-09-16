import axios from 'axios';
import { ICategory } from './types';

const BASE_URL = 'http://localhost:5000';

async function fetchAllCategories(): Promise<ICategory[]> {
  try {
    const res = await axios.get(`${BASE_URL}/categories`);
    return res.data;
  } catch (err: unknown) {
    console.error('API Error', err);
  }
}

export { fetchAllCategories };
