import { getProductsById } from '@/entities/product-card'
import { useProductStore } from '@/shared/model'

class CheckoutPanelModel {
  private static instance: CheckoutPanelModel | null = null

  private constructor() {
    this.handleDispatchInfo()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CheckoutPanelModel()
    }
    return this.instance
  }

  private handleDispatchInfo() {
    document.addEventListener('getCheckoutPanelInfo', () => {
      this.dispatchInfo()
    })
  }

  private async dispatchInfo() {
    const info = await this.getInfo()
    const setCheckoutPanelInfoEvent = new CustomEvent('setCheckoutPanelInfo', {
      detail: info,
    })
    document.dispatchEvent(setCheckoutPanelInfoEvent)
  }

  private async getInfo() {
    try {
      const { getState } = useProductStore
      const { products: ids } = getState()
      let productCount = 0
      let totalPrice = 0

      if (ids.length !== 0) {
        const products = await getProductsById({ ids, info: true })

        products.forEach(({ price }) => {
          ++productCount
          totalPrice = totalPrice += price
        })
      }
      return {
        productCount,
        totalPrice,
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export { CheckoutPanelModel }
