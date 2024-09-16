
import { register } from 'swiper/element/bundle';
import { getPopularProducts } from '@/entities/product-card';

class SliderModel {
  private static instance: SliderModel | null = null;

  private constructor() {
    register();
    this.handleGetProducts();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SliderModel();
    }
    return this.instance;
  }

  private handleGetProducts() {
    document.addEventListener('getSliderProducts', () => {
      this.dispatchProducts();
    });
  }

  private async dispatchProducts() {
    const products = await getPopularProducts();
    const setSliderProductsEvent = new CustomEvent('setSliderProducts', {
      bubbles: true,
      composed: true,
      detail: products,
    });
    document.dispatchEvent(setSliderProductsEvent);
  }
}

export { SliderModel };
