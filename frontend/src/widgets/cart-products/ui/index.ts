import { commonComponentProps } from '@/shared/lib'
import { IProduct } from '@/shared/api'
import { CourseInfo } from '@/shared/ui'
import { ProductCard } from '@/entities/product-card'
import { DeleteFromCart } from '@/features/delete-from-cart'
import { CartProductsEventHandler } from '../handlers'

class CartProducts extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly eventHandler: CartProductsEventHandler
  public products: IProduct[]

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.eventHandler = new CartProductsEventHandler(this)
  }

  connectedCallback() {
    this.getProducts()
    this.render()
    this.handleClickOnContinueShoppingLink()

    document.addEventListener('setCartProducts', this.eventHandler)
  }

  disconnectedCallback() {
    document.removeEventListener('setCartProducts', this.eventHandler)
  }

  private render() {
    const { getCN } = commonComponentProps
    const baseClass = 'cart-products'

    const getClassName = (elem = '', mod = {}): string => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        :host {
          max-width: 960px;
          flex: 1 1 auto;
        }
        .cart-products__container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }
        .cart-products__continue-shopping {
          display: flex;
          align-items: center;
        }
        .cart-products__continue-shopping a {
          text-decoration: none;
          font-size: 22px;
          font-weight: 600;
          line-height: 32px;
          color: #1C6CD5;
        }
        .cart-products__continue-shopping svg {
          position: relative;
          top: 1px;
          margin-right: 10px;
        }
        .cart-products__empty {
          font-size: 32px;
          text-align: center;
          color: #0B1014;
          margin: 75px 0;
        }
      </style>
      <section class="${getClassName()}">
        <div class="${getClassName(
          'container'
        )}" data-cart-products-container="">
            
        </div>
        <div class="${getClassName('continue-shopping')}">
          <a href="/catalog">
            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65686 0.928931L0.292893 7.29289ZM25 7L1 7L1 9L25 9L25 7Z" fill="#1C6CD5"/>
            </svg>
            Продолжить покупки
          </a>
        </div>
      </section>
    `
  }

  public renderProducts() {
    if (this.products && typeof this.products === 'object') {
      const container = this.shadow.querySelector(
        '[data-cart-products-container]'
      )
      container.innerHTML = ''

      if (this.products.length === 0) {
        container.innerHTML = `
          <h2 class="${commonComponentProps.getCN('cart-products', 'empty')}">
            Корзина пуста :(
          </h2>`
        return
      }

      this.products.forEach((product) => {
        const productCard = new ProductCard(product, { page: 'cart' })
        const deleteBtn = new DeleteFromCart(product._id)
        const courseInfo = new CourseInfo()
        deleteBtn.slot = 'deleteBtn'
        courseInfo.slot = 'children'
        productCard.appendChild(deleteBtn)
        productCard.appendChild(courseInfo)
        container.appendChild(productCard)
      })
    }
  }

  private getProducts() {
    const getProductsEvent = new CustomEvent('getCartProducts', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(getProductsEvent)
  }

  private handleClickOnContinueShoppingLink() {
    const link = this.shadow.querySelector('a[href="/catalog"]')
    link.addEventListener('click', (event) => {
      event.preventDefault()

      const target = event.currentTarget as HTMLAnchorElement
      const { pathname: path } = new URL(target.href)

      const routeNavigateEvent = new CustomEvent('route-navigate', {
        bubbles: true,
        composed: true,
        detail: path,
      })
      this.dispatchEvent(routeNavigateEvent)
    })
  }
}

export { CartProducts }
