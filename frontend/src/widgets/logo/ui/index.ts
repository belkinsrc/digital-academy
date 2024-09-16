import { commonComponentProps } from '@/shared/lib'

class Logo extends HTMLElement {
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
    const baseClass = 'logo'
    const src = this.getAttribute('src')
    const alt = this.getAttribute('alt')
    const href = this.getAttribute('href')

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .logo {
          display: block;
          max-width: 394px;
        }
        .logo img {
            max-width: 100%;
        }
      </style>
      <a href="${href}" class="${getClassName()}">
        <img src="${src}" alt="${alt}">
      </a>
    `
  }

  private handleClick() {
    const logo = this.shadow.querySelector('a')

    logo.addEventListener('click', (event: Event) => {
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

export { Logo }
