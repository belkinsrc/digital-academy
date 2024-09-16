import { commonComponentProps } from '@/shared/lib'

class ThanksPage extends HTMLElement {
  private readonly shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
    this.handleClick()
  }

  private render() {
    const { getCN, extraClasses } = commonComponentProps
    const baseClass = 'thanks'

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
        .thanks {
          transform: translateY(50%);
        }
        .thanks__container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .thanks__content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          background-color: #F2F3F4;
          padding: 30px 80px 30px 80px;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .thanks__icon {
          width: 60px;
          height: 60px;
          fill: #1C6CD5;
        }
      </style>
        <div class="${getClassName()}">
          <div class="${getClassName('container')} ${extraClasses.container}">
              <div class="${getClassName('content')}">
                  <svg class="${getClassName(
                    'icon'
                  )}" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 576 512">
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                  </svg>
                  <h1 class="${getClassName('title')} ${extraClasses.title}">
                      Заказ оформлен
                  </h1>
              </div>
              <a href="/catalog" class="${getClassName('redirect-btn')} ${
      extraClasses.button
    }">
                  Продолжить покупки
              </a>
          </div>                
      </div>
    `
  }

  private handleClick() {
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

export { ThanksPage }
