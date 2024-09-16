import { commonComponentProps } from '@/shared/lib'
import { IFilterCategory } from '../types'

class FilterCategory extends HTMLElement implements IFilterCategory {
  private readonly shadow: ShadowRoot
  private readonly name: string
  private readonly _category: string
  private _active: boolean

  constructor(name: string, category: string) {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.name = name
    this._category = category
    this._active = false
  }

  connectedCallback() {
    this.render()
    this.handleChangeCategory()
  }

  set active(value: boolean) {
    this._active = value
    this.updateActivity()
  }

  get active(): boolean {
    return this._active
  }

  get category(): string {
    return this._category
  }

  private render() {
    const { getCN } = commonComponentProps
    const baseClass = 'filter-category'

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod)
    }

    this.shadow.innerHTML = `
      <style>
        .filter-category {
          display: inline-block;
          padding: 12px 24px 12px 24px;
          background-color: #d7e8ff;
          color: #1c6cd5;
          border: none;
          cursor: pointer;
          user-select: none;
          font-weight: 600;
          font-size: 18px;
          line-height: 28px;
          text-align: center;
          margin: 4px 0 4px 0;
          border-radius: 100px;
          transition: background-color 0.3s, color 0.3s;
        }
        .filter-category:hover {
          color: #ffffff;
          background-color: #094593;
        }
        .filter-category_active {
          color: #ffffff;
          background-color: #1c6cd5;
          cursor: default;
        }
        .filter-category_active:hover {
          color: #ffffff;
          background-color: #1c6cd5;
        }
        .filter-category input {
          display: none;
        }
      </style>
      <label class="${getClassName()}">
        <input type="checkbox">
        ${this.name}
      </label>
    `
  }

  private handleChangeCategory() {
    const categoryInputTag = this.shadow.querySelector('input')

    categoryInputTag?.addEventListener('change', () => {
      const changeCategoryEvent = new CustomEvent('changeCategory', {
        bubbles: true,
        composed: true,
        detail: this.category,
      })
      categoryInputTag.dispatchEvent(changeCategoryEvent)
    })
  }

  private updateActivity() {
    const categoryLabelTag = this.shadow.querySelector('label')

    if (this.active) {
      categoryLabelTag?.classList.add('filter-category_active')
    } else {
      categoryLabelTag?.classList.remove('filter-category_active')
    }
  }
}

export { FilterCategory }
