import { commonComponentProps } from '@/shared/lib'
import { ICheckoutPanelInfo } from '../types'
import { CheckoutPanelEventHandler } from '../handlers'

class CheckoutPanel extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly eventHandler: CheckoutPanelEventHandler
  public info: ICheckoutPanelInfo

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.eventHandler = new CheckoutPanelEventHandler(this)
  }

  connectedCallback() {
    this.getInfo()
    this.render()
    this.handlePlaceOrder()

    document.addEventListener('setCheckoutPanelInfo', this.eventHandler)
  }

  disconnectedCallback() {
    document.removeEventListener('setCheckoutPanelInfo', this.eventHandler)
  }

  private render() {
    const { getCN, extraClasses } = commonComponentProps

    const baseClass = 'checkout-panel'

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .total-price {
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          color: #0B1014;
        }
        .button {
          text-decoration: none;
          color: #fff;
          background-color: #1C6CD5;
          padding: 12px 31px;
          border-radius: 10px;
          font-weight: 700;
          transition: background-color 0.3s;
          box-shadow: -3px 3px 15px 0 #00000040;
          cursor: pointer;
          border: none;
        }
        .button:hover {
          background-color: #094593;
        }
        .button_disabled {
          background-color: #D7E8FF;
          color: #1C6CD5;
          box-shadow: none;
          cursor: default;
          pointer-events: none;
        }
        .checkout-panel {
          padding: 56px;
          border-radius: 25px;
          background: linear-gradient(113.92deg, #F0F2F4 50.61%, #B5FF93 99.87%);
        }
        .checkout-panel__title {
          font-size: 32px;
          font-weight: 700;
          line-height: 40px;
          color: #0B1014;
          margin-bottom: 32px;
        }
        .checkout-panel__order-section {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #0B1014;
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .checkout-panel__promo-code-section {
          display: flex;
          flex-direction: column;
        }
        .checkout-panel__total-section {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #0B1014;
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
        }
        .checkout-panel__promo-code-label {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #0B1014;
          margin-bottom: 8px;
        }
        .checkout-panel__promo-code-input {
          font-size: 18px;
          font-weight: 400;
          line-height: 32px;
          color: #0B1014;
          border-radius: 10px;
          border: 1px solid rgba(34, 34, 34, 0.15);
          padding: 8px 18px;
          margin-bottom: 24px;
        }
        .checkout-panel__decor-line {
          color: rgba(0, 0, 0, 0.3);
          margin-bottom: 24px;
        }
        .checkout-panel__button {
          font-size: 20px;
          font-weight: 600;
          line-height: 32px;
          padding: 12px 64px;
        }
      </style>
      <section class="${getClassName()}">
          <form action="#" method="post" class="${getClassName('form')}">
              <h3 class="${getClassName('title')}">
                  Итого
              </h3>
              <div class="${getClassName('order-section')}">
                  <p class="${getClassName(
                    'product-count'
                  )}" data-product-count>
                      Товары (0)
                  </p>
                  <p class="${extraClasses.totalPrice}" data-total-price>
                      0 ₽
                  </p>
              </div>
              <div class="${getClassName('promo-code-section')}">
                  <label class="${getClassName('promo-code-label')}">
                      Промокод
                  </label>
                  <input type="text" placeholder="Введите промокод" class="${getClassName(
                    'promo-code-input'
                  )}">
              </div>
              <hr class="${getClassName('decor-line')}">
              <div class="${getClassName('total-section')}">
                  <p class="${getClassName('total-amount')}">
                      Итоговая сумма
                  </p>
                  <p class="${extraClasses.totalPrice}" data-total-price>
                      0 ₽
                  </p>
              </div>
              <a href="/thanks" class="${getClassName('button')} 
                      ${extraClasses.button}"
                      data-checkout-btn>
                  Оформить заказ
              </a>
          </form>
      </section>
    `
  }

  public renderInfo() {
    const productCountElem = this.shadow.querySelector('[data-product-count]')
    const totalPriceElemts = this.shadow.querySelectorAll('[data-total-price]')

    const { productCount, totalPrice } = this.info

    productCountElem.innerHTML = `Товары (${productCount})`

    totalPriceElemts.forEach((elem) => {
      elem.innerHTML = `${totalPrice} ₽`
    })
  }

  public updateButton() {
    const { productCount } = this.info
    const btn = this.shadow.querySelector('[data-checkout-btn]')

    if (productCount === 0) {
      btn.classList.add('button_disabled')
    } else {
      btn.classList.remove('button_disabled')
    }
  }

  private getInfo() {
    const getCheckoutPanelInfoEvent = new CustomEvent('getCheckoutPanelInfo', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(getCheckoutPanelInfoEvent)
  }

  private handlePlaceOrder() {
    const btn = this.shadow.querySelector('[data-checkout-btn]')

    btn.addEventListener('click', (event) => {
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

export { CheckoutPanel }
