import { commonComponentProps } from '@/shared/lib'
import { IProduct } from '@/shared/api/products/types'

class ProductCard extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly data: IProduct
  private readonly extraClasses: Record<string, string>

  constructor(data: IProduct, extraClasses: Record<string, string>) {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = data
    this.extraClasses = extraClasses
  }

  connectedCallback() {
    this.render()
  }

  private render() {
    const baseClass = 'card'

    const getClassName = (elem = '', mod = {}): string => {
      return commonComponentProps.getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        h3 {
          margin: 0;
        }
        .card {
          position: relative;
          background-color: #F2F3F4;
          padding: 20px;
          border-radius: 12px;
          display: flex;
        }
        .card__content {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        }
        .card__title {
          line-height: 28px;
          color: #0B1014;
        }
        .card__description {
          display: inline-block;
          margin-bottom: 10px;
        }
        .card--page-catalog {
          max-width: 328px;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .card--page-cart {
          justify-content: flex-start;
          align-items: center;
        }
        .card--page-catalog .card__image-wrapper {
          margin-bottom: 24px;
        }
        .card--page-cart .card__image-wrapper {
          margin-right: 30px;
          max-width: 188px;
        }
        .card--page-cart .card__image-wrapper img {
          width: 100%;
        }
        .card--page-catalog .card__title {
          margin-bottom: 24px;
          font-size: 20px;
        }
        .card--page-cart .card__title {
          margin-bottom: 20px;
          font-size: 24px;
        }
      </style>
      <article class="${getClassName('', this.extraClasses)}">
        <div class="${getClassName('image-wrapper')}">
          <img src="${this.data.imageSrc}" alt="image">
        </div>
        <div class="${getClassName('content')}">
          <span class="${getClassName('description')}">
            ${this.data.label}
          </span>
          <h3 class="${getClassName('title')}">
            «${this.data.productName}»
          </h3>
          <slot name="children"></slot>               
        </div>
        <slot name="deleteBtn"></slot>
      </article>
    `
  }
}

export { ProductCard }
