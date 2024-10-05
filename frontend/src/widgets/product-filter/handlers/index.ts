import { ICategory, IProduct } from '@/shared/api'
import { ProductFilter } from '../ui'

class ProductFilterEventHandler {
  private readonly productFilter: ProductFilter

  constructor(productFilter: ProductFilter) {
    this.productFilter = productFilter
  }

  handleEvent(event: Event) {
    switch (event.type) {
      case 'setFilterCategories':
        this.handleSetFilterCategories(event)
        break
      case 'setFilterProducts':
        this.handleSetFilterProducts(event)
        break
      case 'setFilterActiveCategory':
        this.handleSetFilterActiveCategory(event)
        break
    }
  }

  private handleSetFilterCategories(event: Event) {
    const customEvent = event as CustomEvent<ICategory[]>
    this.productFilter.categories = customEvent.detail
    this.productFilter.renderCategories()
  }

  private handleSetFilterProducts(event: Event) {
    const customEvent = event as CustomEvent<IProduct[]>
    this.productFilter.products = customEvent.detail
    this.productFilter.renderProducts()
  }

  private handleSetFilterActiveCategory(event: Event) {
    const customEvent = event as CustomEvent<string>
    this.productFilter.activeCategory = customEvent.detail
    this.productFilter.markActiveCategory()
  }
}

export { ProductFilterEventHandler }
