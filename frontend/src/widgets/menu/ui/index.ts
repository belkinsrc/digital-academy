import { commonComponentProps } from '@/shared/lib';

class Menu extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const { getCN } = commonComponentProps;
    const baseClass = 'menu';

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod);
    };

    this.shadow.innerHTML = `
      <style>
        .menu {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .menu__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <nav class="${getClassName()}">
        <app-logo
          href="/"
          src="./images/logo.svg"
          alt="Логотип сайта"
          >
        </app-logo>
        <ul class="${getClassName('list')}">
          <slot name="menu-item"></slot>
          <cart-button 
            href="/cart"
            >
            Корзина
          </cart-button>
        </ul>                  
      </nav>
    `;
  }
}

export { Menu };
