import { commonComponentProps } from '@/shared/lib'

class MainPage extends HTMLElement {
  private readonly shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  private render() {
    const { getCN, extraClasses } = commonComponentProps
    const baseClass = 'main'

    const getClassName = (elem = '', mod = {}): string => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .main__title {
          font-size: 48px;
          margin: 56px 0;
        }
        .main__slider {
          margin-bottom: 120px;
        }
      </style>
      <h2 class="${getClassName('title')} ${extraClasses.title}">
        Популярные товары
      </h2>
      <div class="${getClassName('slider')}">
        <app-slider></app-slider>
      </div>
      <about-us></about-us>
    `
  }
}

export { MainPage }
