import { commonComponentProps } from '@/shared/lib'
import { IAddToCart, IAddToCartEventDetail, IAddToCartParams } from '../types'

class AddToCart extends HTMLElement implements IAddToCart {
  private readonly shadow: ShadowRoot
  private readonly productId: string
  private _label: string
  private _active: boolean

  constructor({ label, active = true, productId }: IAddToCartParams) {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this._label = label
    this._active = active
    this.productId = productId
  }

  set active(value: boolean) {
    this._active = value
    this.updateActivity()
  }

  set label(value: string) {
    this._label = value
    this.updateLabel()
  }

  get active(): boolean {
    return this._active
  }

  get label(): string {
    return this._label
  }

  connectedCallback() {
    this.init()
    this.handleClick()
  }

  private init() {
    const { getCN, extraClasses = {} } = commonComponentProps
    const baseClass = 'add-to-cart'

    const getClassName = (elem = '', mod = {}): string => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
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
        .button_disabled:hover {
          background-color: #D7E8FF;
        }
      </style>
      <button class="${getClassName()} 
        ${extraClasses.button}
        ${this._active ? '' : 'button_disabled'}"
      >
        ${this._label}
      </button>
    `
  }

  private handleClick() {
    const button = this.shadow.querySelector('button')

    button?.addEventListener('click', () => {
      const addToCartEvent = new CustomEvent<IAddToCartEventDetail>(
        'addToCart',
        {
          bubbles: true,
          composed: true,
          detail: {
            component: this,
            productId: this.productId,
          },
        }
      )
      button.dispatchEvent(addToCartEvent)
    })
  }

  private updateActivity() {
    const button = this.shadow.querySelector('button')

    if (!this._active) {
      button?.classList.add('button_disabled')
      button?.setAttribute('disabled', '')
    } else {
      button?.classList.remove('button_disabled')
      button?.removeAttribute('disabled')
    }
  }

  private updateLabel() {
    const button = this.shadow.querySelector('button')
    button!.textContent = this._label
  }
}

export { AddToCart }
