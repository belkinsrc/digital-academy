import { commonComponentProps } from '@/shared/lib'

class CartPage extends HTMLElement {
  private readonly shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  private render() {
    const { getCN, extraClasses } = commonComponentProps
    const baseClass = 'cart'

    const getClassName = (elem = '', mod = {}): string => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .cart__container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .cart__title {
          font-size: 48px;
          margin: 56px 0;
        }
      </style>
      <page-breadcrumbs page="Корзина"></page-breadcrumbs>
      <h2 class="${getClassName('title')} ${extraClasses.title}">
        Корзина
      </h2>
      <div class="${getClassName('container')}">
        <cart-products></cart-products>
        <checkout-panel></checkout-panel>
      </div>
    `
  }
}

export { CartPage }
