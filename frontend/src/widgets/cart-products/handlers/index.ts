import { IProduct } from '@/shared/api'
import { CartProducts } from '../ui'

class CartProductsEventHandler {
  private readonly cartProducts: CartProducts

  constructor(cartProducts: CartProducts) {
    this.cartProducts = cartProducts
  }

  handleEvent(event: Event) {
    switch (event.type) {
      case 'setCartProducts':
        this.handleSetCartProducts(event)
        break
    }
  }

  private handleSetCartProducts(event: Event) {
    const customEvent = event as CustomEvent<IProduct[]>
    const products = customEvent.detail
    this.cartProducts.products = products
    this.cartProducts.renderProducts()
  }
}

export { CartProductsEventHandler }
