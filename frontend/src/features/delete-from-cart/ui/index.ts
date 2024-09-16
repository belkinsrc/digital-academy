import { commonComponentProps } from '@/shared/lib'
import { IDeleteFromCartEventDetail } from '../types'

class DeleteFromCart extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly productId: string

  constructor(productId: string) {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.productId = productId
  }

  connectedCallback() {
    this.init()
    this.handleClick()
  }

  private init() {
    const { getCN } = commonComponentProps
    const baseClass = 'delete-from-cart'

    const getClassName = (elem = '', mod = {}): string => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .delete-from-cart {
          position: absolute;
          width: 22px;
          height: 22px;
          cursor: pointer;
          top: 20px;
          right: 20px;
        }
        .delete-from-cart svg {
          width: 100%;
        }
      </style>
      <div class="${getClassName()}">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 1L1 21M21 21L1 1L21 21Z" stroke="#222222" stroke-width="2"/>
        </svg>
      </div>
    `
  }

  private handleClick() {
    const button = this.shadow.querySelector('.delete-from-cart')

    button?.addEventListener('click', () => {
      const deleteFromCartEvent = new CustomEvent<IDeleteFromCartEventDetail>(
        'deleteFromCart',
        {
          bubbles: true,
          composed: true,
          detail: {
            productId: this.productId,
          },
        }
      )
      button.dispatchEvent(deleteFromCartEvent)
    })
  }
}

export { DeleteFromCart }
