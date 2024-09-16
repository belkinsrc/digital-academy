import { useCategoryStore } from '@/shared/model'
import { getProductsByCategory } from '@/entities/product-card'
import { getFilterCategories } from '@/entities/filter-category'

export class ProductFilterModel {
  private static instance: ProductFilterModel | null = null
  private activeCategory: string = 'all'

  private constructor() {
    this.init()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ProductFilterModel()
    }
    return this.instance
  }

  private init() {
    const { getState } = useCategoryStore
    const { activeCategory } = getState()
    this.activeCategory = activeCategory

    this.handleGetFilterCategories()
    this.handleGetProductCards()
    this.handleChangeCategory()
  }

  private handleGetFilterCategories() {
    document.addEventListener('getFilterCategories', () => {
      this.dispatchFilterCategories()
    })
  }

  private handleGetProductCards() {
    document.addEventListener('getFilterProducts', () => {
      this.dispatchProductCardsByCategory(this.activeCategory)
    })
  }

  private handleChangeCategory() {
    document.addEventListener('changeCategory', (event: Event) => {
      const customEvent = event as CustomEvent<string>
      const category = customEvent.detail
      this.activeCategory = category
      this.markActiveCategory(this.activeCategory)
      this.dispatchProductCardsByCategory(category)
      this.updateUrlWithCategory(category)
      this.updateStateWithCategory(category)
    })
  }

  private async dispatchProductCardsByCategory(category: string) {
    const products = await getProductsByCategory(category)
    const setProductsEvent = new CustomEvent('setFilterProducts', {
      bubbles: true,
      composed: true,
      detail: products,
    })
    document.dispatchEvent(setProductsEvent)
  }

  private async dispatchFilterCategories() {
    const categories = await getFilterCategories()
    const setCategoriesEvent = new CustomEvent('setFilterCategories', {
      bubbles: true,
      composed: true,
      detail: categories,
    })
    document.dispatchEvent(setCategoriesEvent)
    this.markActiveCategory(this.activeCategory)
  }

  private markActiveCategory(category: string) {
    const setActiveCategoryEvent = new CustomEvent('setFilterActiveCategory', {
      bubbles: true,
      composed: true,
      detail: category,
    })
    document.dispatchEvent(setActiveCategoryEvent)
  }

  private updateUrlWithCategory(category: string) {
    const urlWithCategory = new URL(window.location.href)
    urlWithCategory.search = `category=${category}`
    window.history.replaceState({}, '', urlWithCategory)
  }

  private updateStateWithCategory(category: string) {
    const { getState } = useCategoryStore
    const { setActive } = getState()
    setActive(category)
  }
}
