import { useProductStore } from '@/shared/model'
import { IDeleteFromCartEventDetail } from '../types'

class DeleteFromCartModel {
  private static instance: DeleteFromCartModel | null = null

  private constructor() {
    this.handleDeleteFromCart()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DeleteFromCartModel()
    }
    return this.instance
  }

  private handleDeleteFromCart() {
    document.addEventListener('deleteFromCart', (event: Event) => {
      const customEvent = event as CustomEvent<IDeleteFromCartEventDetail>
      const { productId } = customEvent.detail
      const { getState } = useProductStore
      const { removeProduct } = getState()
      removeProduct(productId)
      this.updateCart()
    })
  }

  private updateCart() {
    const getCartProductsEvent = new CustomEvent('getCartProducts')
    const getCheckoutPanelInfoEvent = new CustomEvent('getCheckoutPanelInfo')
    document.dispatchEvent(getCartProductsEvent)
    document.dispatchEvent(getCheckoutPanelInfoEvent)
  }
}

export { DeleteFromCartModel }
