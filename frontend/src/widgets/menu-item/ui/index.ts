import { commonComponentProps } from '@/shared/lib'

class MenuItem extends HTMLElement {
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
    const { getCN } = commonComponentProps
    const baseClass = 'menu'
    const href = this.getAttribute('href')

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .menu__item {
          margin-right: 40px;
        }
        .menu__link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 14px;
          font-weight: 600;
          line-height: calc(24 / 14 * 100%);
          text-decoration: none;
          letter-spacing: 1px;
          transition: color 0.3s;
          color: #000;
        }
      </style>
      <li class="${getClassName('item')}">
        <a href="${href}" class="${getClassName('link')}">
          <slot></slot>
        </a>                        
      </li>
    `
  }

  private handleClick() {
    const link = this.shadow.querySelector('a')
    link.addEventListener('click', (event) => {
      event.preventDefault()

      const target = event.currentTarget as HTMLAnchorElement
      const { pathname: path } = new URL(target.href)
      const currentPath = window.location.pathname

      if (currentPath !== path) {
        const routeNavigateEvent = new CustomEvent('route-navigate', {
          bubbles: true,
          composed: true,
          detail: path,
        })
        this.dispatchEvent(routeNavigateEvent)
      }
    })
  }
}

export { MenuItem }
