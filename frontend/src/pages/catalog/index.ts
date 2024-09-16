import { commonComponentProps } from '@/shared/lib'
import { useCategoryStore } from '@/shared/model'

class CatalogPage extends HTMLElement {
  private readonly shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const { getState } = useCategoryStore
    const { activeCategory } = getState()

    const params = new URLSearchParams(window.location.search)
    params.set('category', activeCategory)
    const newUrl = window.location.pathname + '?' + params.toString()
    window.history.replaceState({}, '', newUrl)

    this.render()
  }

  private render() {
    const { getCN, extraClasses } = commonComponentProps
    const baseClass = 'catalog'

    const getClassName = (elem = '', mod = {}): string => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .catalog__title {
          font-size: 48px;
          margin: 56px 0;
        }
      </style>
      <page-breadcrumbs page="Каталог"></page-breadcrumbs>
      <h2 class="${getClassName('title')} ${extraClasses.title}">
        Каталог
      </h2>
      <product-filter></product-filter>
    `
  }
}

export { CatalogPage }
