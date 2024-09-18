import { commonComponentProps } from '@/shared/lib';

class Footer extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.handleClick();
  }

  private render() {
    const { getCN, extraClasses } = commonComponentProps;
    const baseClass = 'footer';

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod);
    };

    this.shadow.innerHTML = `
      <style>
        .container {
          box-sizing: content-box;
          position: relative;
          max-width: 1408px;
          margin: auto;
          padding: 0 20px;
        }
        .footer {
          box-shadow: 0 -2px 10px 0 #0000001A;
        }
        .footer__nav-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
        }
        .footer__contact-info {
          padding: 32px 0;
        }
        .footer__list {
          display: flex;
          list-style: none;
          gap: 40px;
          padding: 0;
        }
        .footer__link {
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          line-height: 24px;
          color: #222222;
        }
        .footer__policy {
          font-size: 15px;
          font-weight: 600;
          line-height: 24px;
          color: #222222;
        }
        .footer hr {
          border: 1px solid rgba(0, 0, 0, 0.3)
        }
        .footer__contact-info {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 56px;
        }
        .footer__address-label {
          font-size: 13px;
          font-weight: 400;
          line-height: 24px;
          color: #888888;
        }
        .footer__address-content {
          font-size: 15px;
          font-weight: 600;
          line-height: 24px;
          color: #222222;
        }
        .footer__email-label {
          font-size: 13px;
          font-weight: 400;
          line-height: 24px;
          color: #888888;
        }
        .footer__email-content {
          text-decoration: none;
          display: block;
          font-size: 15px;
          font-weight: 600;
          line-height: 24px;
          color: #222222;
        }
      </style>
      <footer class="${getClassName()}">
        <div class="${extraClasses.container}">
          <div class="${getClassName('nav-section')}">
            <nav class="${getClassName('nav')}">
              <ul class="${getClassName('list')}">
                <li class="${getClassName('item')}">
                  <a href="/catalog" class="${getClassName('link')}" data-nav-link>
                    КУРСЫ
                  </a>                        
                </li>
                <li class="${getClassName('item')}">
                  <a href="/about" class="${getClassName('link')}" data-nav-link>
                    О НАС
                  </a>                        
                </li>
                <li class="${getClassName('item')}">
                  <a href="/reviews" class="${getClassName('link')}" data-nav-link>
                    ОТЗЫВЫ
                  </a>                        
                </li>
                <li class="${getClassName('item')}">
                  <a href="/contacts" class="${getClassName('link')}" data-nav-link>
                    КОНТАКТЫ
                  </a>                        
                </li>
              </ul>
            </nav>
              <span class="${getClassName('policy')}">
                Политика конфиденциальности
              </span>
            </div>
            <hr>
            <div class="${getClassName('contact-info')}">
              <div class="${getClassName('address-block')}">
                <span class="${getClassName('address-label')}">
                  Наш адрес
                </span>
                <p class="${getClassName('address-content')}">
                  г. Челябинск, ул. Лесопарковая 5/2
                </p>
              </div>
              <div class="${getClassName('email-block')}">
                <span class="${getClassName('email-label')}">
                  Эл. почта
                </span>
                <a href="mailto:info@d-element.ru" class="${getClassName(
                  'email-content'
                )}">
                  info@d-element.ru
                </a>
              </div>
            </div>
          </div>
      </footer>
    `;
  }

  private handleClick() {
    const links = this.shadow.querySelectorAll('[data-nav-link]')
    links.forEach((link) => {
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
    })
  }
}

export { Footer };
