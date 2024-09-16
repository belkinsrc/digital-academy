import { commonComponentProps } from '@/shared/lib'

class App extends HTMLElement {
  private readonly shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  private render() {
    const { extraClasses } = commonComponentProps

    this.shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .main {
          flex-grow: 1;
          margin-top: 96px;
          margin-bottom: 120px;
        }
        .container {
          box-sizing: content-box;
          position: relative;
          max-width: 1408px;
          margin: auto;
          padding: 0 20px;
        }
      </style> 
      <app-header>
        <app-menu slot="menu">
          <menu-item slot="menu-item" href="/about">О НАС</menu-item>
          <menu-item slot="menu-item" href="/catalog">ПРОДУКТЫ</menu-item>
          <menu-item slot="menu-item" href="/contacts">КОНТАКТЫ</menu-item> 
        </app-menu>
      </app-header>
      <main class="main">
        <div class="${extraClasses.container}">
          <slot name="page"></slot>
        </div>
      </main>
      <app-footer></app-footer>
    `
  }
}

export { App }
