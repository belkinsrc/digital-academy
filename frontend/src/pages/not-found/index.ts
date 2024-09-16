import { commonComponentProps } from '@/shared/lib'

class NotFoundPage extends HTMLElement {
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
    const baseClass = 'not-found'

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
        .not-found {
          transform: translateY(50%);
        }
        .not-found__container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .not-found__content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          background-color: #F2F3F4;
          padding: 30px 80px 30px 80px;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .not-found__icon {
          width: 60px;
          height: 60px;
          fill: #FF6347;
        }
      </style>
        <div class="${getClassName()}">
          <div class="${getClassName('container')} ${extraClasses.container}">
              <div class="${getClassName('content')}">
                  <h1 class="${getClassName('title')} ${extraClasses.title}">
                      Страница не найдена :(
                  </h1>
              </div>
              <a href="/" class="${getClassName('redirect-btn')} ${
      extraClasses.button
    }">
                  Вернуться на главную
              </a>
          </div>                
      </div>
    `
  }

  private handleClick() {
    const link = this.shadow.querySelector('a[href="/"]')
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

export { NotFoundPage }
