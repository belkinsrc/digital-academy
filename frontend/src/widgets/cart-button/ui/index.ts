import { commonComponentProps } from '@/shared/lib'

class CartButton extends HTMLElement {
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
    const baseClass = 'cart-btn'
    const href = this.getAttribute('href')

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .button {
          text-decoration: none;
          color: #fff; /* Белый текст */
          background-color: #1C6CD5; /* Синий фон */
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
          color: #1C6CD5;
        }
        .cart-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          color: #ffffff;
          transition: background-color 0.3s;
          font-weight: 600;
        }
        .cart-btn__icon {
          display: none
        }
      </style>
      <li class="menu__item">
        <a href="${href}" class="${getClassName()} menu__link ${
      extraClasses.button
    }">
          <svg class="${getClassName(
            'icon'
          )}" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 576 512">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.86902 4H5.90124L6.98144 14.7399C7.02634 15.036 7.17672 15.3058 7.40489 15.4998C7.63305 15.6937 7.92363 15.7986 8.22305 15.7953H16.0452C16.316 15.8094 16.5839 15.7345 16.808 15.5821C17.0323 15.4296 17.2004 15.208 17.2868 14.951L18.9381 9.98456C18.9997 9.79784 19.0161 9.59916 18.9858 9.4049C18.9556 9.21063 18.8797 9.02631 18.7643 8.86711C18.6441 8.69785 18.4833 8.56144 18.2969 8.47033C18.1104 8.37923 17.9039 8.33636 17.6965 8.34563H6.33581" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.6902 21.24C14.7956 21.24 14.0702 20.5146 14.0702 19.62C14.0702 18.7254 14.7956 18 15.6902 18C16.5848 18 17.3102 18.7254 17.3102 19.62C17.3102 20.5146 16.5848 21.24 15.6902 21.24Z" fill="white"/>
              <path d="M7.61988 21.24C6.72515 21.24 5.99988 20.5146 5.99988 19.62C5.99988 18.7254 6.72515 18 7.61988 18C8.51457 18 9.23988 18.7254 9.23988 19.62C9.23988 20.5146 8.51457 21.24 7.61988 21.24Z" fill="white"/>
          </svg>
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

export { CartButton }
