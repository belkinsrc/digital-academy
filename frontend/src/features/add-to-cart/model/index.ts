import { useProductStore } from '@/shared/model'
import { IAddToCart, IAddToCartEventDetail } from '../types'

class AddToCartModel {
  private static instance: AddToCartModel | null = null

  private constructor() {
    this.handleAddToCart()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AddToCartModel()
    }
    return this.instance
  }

  private handleAddToCart() {
    document.addEventListener('addToCart', (event: Event) => {
      const customEvent = event as CustomEvent<IAddToCartEventDetail>
      const { productId, component } = customEvent.detail
      const { getState } = useProductStore
      const { products, addProduct } = getState()

      if (products.includes(productId)) return

      addProduct(productId)
      this.updateComponent(component)
    })
  }

  private updateComponent(component: IAddToCart) {
    component.active = false
    component.label = 'Уже в корзине'
  }
}

export { AddToCartModel }
