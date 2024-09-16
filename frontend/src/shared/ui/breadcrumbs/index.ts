import { commonComponentProps } from '../../lib';

class Breadcrumbs extends HTMLElement {
  private readonly shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.handleClick();
  }

  private render() {
    const { getCN } = commonComponentProps;
    const baseClass = 'breadcrumbs';
    const currentPage = this.getAttribute('page');

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod);
    };

    this.shadow.innerHTML = `
      <style>
        .breadcrumbs {
          margin-top: 24px;
        }
        .breadcrumbs__list {
          padding: 0;
          list-style: none;
          display: flex;
        }
        .breadcrumbs__item {
          color: #888888;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          cursor: default;
        }
        .breadcrumbs__link {
          text-decoration: none;
          color: #888888;
        }
        .breadcrumbs__separator {
          display: inline-block;
          margin: 0 6px 0 9px;
        }
      </style>
      <nav class="${getClassName()}">
        <ul class="${getClassName('list')}">
            <li class="${getClassName('item')}">
                <a href="/" class="${getClassName('link')}">
                    ГЛАВНАЯ
                </a>
            </li>
            <li class="${getClassName('item')}">
                <span class="${getClassName('separator')}">/</span>
                ${currentPage?.toUpperCase()}
            </li>
        </ul>                     
      </nav>
    `;
  }

  private handleClick() {
    const link = this.shadow.querySelector('a[href="/"]');
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const target = event.currentTarget as HTMLAnchorElement;
      const { pathname: path } = new URL(target.href);

      const routeNavigateEvent = new CustomEvent('route-navigate', {
        bubbles: true,
        composed: true,
        detail: path,
      });
      this.dispatchEvent(routeNavigateEvent);
    });
  }
}

export { Breadcrumbs };
