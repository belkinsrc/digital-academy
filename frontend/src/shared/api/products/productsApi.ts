import axios from 'axios';
import { IProductFetchParams, IProductFetchBody } from './types';

const BASE_URL = 'http://localhost:5000';

async function fetchProducts(params: IProductFetchParams) {
  try {
    const res = await axios.get(`${BASE_URL}/products`, {
      params: {
        ...params,
      },
    });
    return res.data;
  } catch (err: unknown) {
    console.error('API Error:', err);
  }
}

async function fetchProductsById(options: IProductFetchBody) {
  try {
    const res = await axios.post(`${BASE_URL}/products`, {
      data: {
        ...options,
      },
    });
    return res.data;
  } catch (err: unknown) {
    console.error('API Error:', err);
  }
}

async function fetchPopularProducts() {
  try {
    const res = await axios.get(`${BASE_URL}/products`, {
      params: {
        popular: true,
      },
    });
    return res.data;
  } catch (err: unknown) {
    console.error('API Error:', err);
  }
}

export { fetchProducts, fetchProductsById, fetchPopularProducts };
