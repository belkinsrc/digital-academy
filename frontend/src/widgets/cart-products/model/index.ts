import { useProductStore } from '@/shared/model'
import { getProductsById } from '@/entities/product-card'

class CartProductsModel {
  private static instance: CartProductsModel | null = null

  private constructor() {
    this.handleDispatchProducts()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CartProductsModel()
    }
    return this.instance
  }

  private handleDispatchProducts() {
    document.addEventListener('getCartProducts', () => {
      this.dispatchProducts()
    })
  }

  private async dispatchProducts() {
    const products = await this.getProducts()
    const setProductsEvent = new CustomEvent('setCartProducts', {
      detail: products,
    })
    document.dispatchEvent(setProductsEvent)
  }

  private async getProducts() {
    try {
      const { getState } = useProductStore
      const { products: ids } = getState()

      if (ids.length !== 0) {
        return await getProductsById({ ids })
      } else {
        return []
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export { CartProductsModel }
