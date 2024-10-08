import { commonComponentProps } from '@/shared/lib'
import { IProduct, ICategory } from '@/shared/api'
import { useProductStore } from '@/shared/model'
import { FilterCategory } from '@/entities/filter-category'
import { ProductCard } from '@/entities/product-card'
import { IFilterCategory } from '@/entities/filter-category/types'
import { AddToCart } from '@/features/add-to-cart'
import { ProductFilterEventHandler } from '../handlers'

class ProductFilter extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly eventHandler: ProductFilterEventHandler
  public categories!: ICategory[]
  public products!: IProduct[]
  public activeCategory!: string

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.eventHandler = new ProductFilterEventHandler(this)
  }

  connectedCallback() {
    this.getCategories()
    this.getProducts()
    this.render()

    document.addEventListener('setFilterCategories', this.eventHandler)
    document.addEventListener('setFilterProducts', this.eventHandler)
    document.addEventListener('setFilterActiveCategory', this.eventHandler)
  }

  disconnectedCallback() {
    document.removeEventListener('setFilterCategories', this.eventHandler)
    document.removeEventListener('setFilterProducts', this.eventHandler)
    document.removeEventListener('setFilterActiveCategory', this.eventHandler)
  }

  private render() {
    const { getCN } = commonComponentProps
    const baseClass = 'product-filter'

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .product-filter {
        }
        .product-filter__container {
          display: flex;
          justify-content: flex-start;
        }
        .product-filter__sidebar {
          max-width: 300px;
          margin-right: 32px;
        }
        .product-filter__cards {
          flex: 1 1 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
      </style>
      <section class="${getClassName()}">
        <div class="${getClassName('container')}">             
          <div class="${getClassName('sidebar')}">
          
          </div>  
          <div class="${getClassName('cards')}">
            
          </div>             
        </div>         
      </section>  
    `
  }

  public renderCategories() {
    if (!this.categories) return

    const sidebar = this.shadow.querySelector('.product-filter__sidebar')
    sidebar!.innerHTML = ''

    this.categories.forEach(({ name, category }) => {
      const filterCategoryTag = new FilterCategory(name, category)
      sidebar?.appendChild(filterCategoryTag)
    })
  }

  public markActiveCategory() {
    if (!this.activeCategory) return

    const categoriesTags = this.shadow.querySelectorAll(
      'filter-category'
    ) as NodeListOf<IFilterCategory>

    categoriesTags.forEach((elem) => {
      if (elem.active && elem.category !== this.activeCategory) {
        elem.active = false
      }
      if (elem.category === this.activeCategory) {
        elem.active = true
      }
    })
  }

  public renderProducts() {
    if (typeof this.products === 'object' && this.products.length > 0) {
      const cardsContainer = this.shadow.querySelector('.product-filter__cards')

      cardsContainer!.innerHTML = ''

      this.products.forEach((product) => {
        const productCardTag = new ProductCard(product, { page: 'catalog' })
        const addToCartParams = this.getAddToCartParams(product._id)
        const addToCartTag = new AddToCart(addToCartParams)
        addToCartTag.slot = 'children'
        productCardTag.appendChild(addToCartTag)
        cardsContainer?.appendChild(productCardTag)
      })
    }
  }

  private getAddToCartParams(productId: string) {
    const { getState } = useProductStore
    const { products } = getState()
    const params = {
      label: 'В корзину',
      active: true,
      productId: productId,
    }
    if (products.includes(productId)) {
      params.label = 'Уже в корзине'
      params.active = false
      return params
    }
    return params
  }

  private getCategories() {
    const getFilterCategoriesEvent = new CustomEvent('getFilterCategories', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(getFilterCategoriesEvent)
  }

  private getProducts() {
    const getFilterProductsEvent = new CustomEvent('getFilterProducts', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(getFilterProductsEvent)
  }
}

export { ProductFilter }
