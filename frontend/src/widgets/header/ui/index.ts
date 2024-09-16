import { commonComponentProps } from '@/shared/lib';

class Header extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const { getCN, extraClasses } = commonComponentProps;
    const baseClass = 'header';

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod);
    };

    this.shadow.innerHTML = `
      <style>
        .header {
          position: fixed;
          top: 0;
          z-index: 1000;
          width: 100%;
          background-color: #fff;
          color: #1C6CD5;
          padding: 24px 0;
          box-shadow: 0 2px 10px 0 #0000001A;
        }
        .container {
          box-sizing: content-box;
          position: relative;
          max-width: 1408px;
          margin: auto;
          padding: 0 20px;
        }
      </style>
      <header class="${getClassName()}" data-js-header="">
        <div class="${extraClasses.container}">
          <slot name="menu"></slot>
        </div>                   
      </header>
    `;
  }
}

export { Header };
