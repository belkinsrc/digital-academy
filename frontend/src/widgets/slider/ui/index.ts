import { useProductStore } from '@/shared/model'
import { IProduct } from '@/shared/api'
import { ProductCard } from '@/entities/product-card'
import { AddToCart } from '@/features/add-to-cart'
import { SliderEventHandler } from '../handlers'

class Slider extends HTMLElement {
  private readonly shadow: ShadowRoot
  private readonly eventHandler: SliderEventHandler
  public products: IProduct[]

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.eventHandler = new SliderEventHandler(this)
  }

  connectedCallback() {
    this.getProducts()
    this.render()
    this.sliderNavigation()

    document.addEventListener('setSliderProducts', this.eventHandler)
  }

  disconnectedCallback() {
    document.removeEventListener('setSliderProducts', this.eventHandler)
  }

  private render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          position: relative;
        }
        swiper-slide {
          width: fit-content;
        }
        .swiper-buttons {
          position: absolute;
          right: 0;
          top: -102px;
          display: flex;
          gap: 32px;
        }
        .swiper-buttons div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          cursor: pointer;
          transition: box-shadow 0.3s;
        }
        .swiper-buttons div:hover {
          box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.25);
        }
      </style>
      <swiper-container></swiper-container>
      <div class="swiper-buttons">
        <div class="prev-button">
            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65686 0.928931L0.292893 7.29289ZM25 7L1 7L1 9L25 9L25 7Z" fill="black"/>
            </svg>
        </div>
        <div class="next-button">
            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM0 9H24V7H0V9Z" fill="black"/>
            </svg>
        </div>
      </div>
    `
  }

  private getProducts() {
    const getSliderProductsEvent = new CustomEvent('getSliderProducts', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(getSliderProductsEvent)
  }

  public renderProducts() {
    if (typeof this.products === 'object' && this.products.length > 0) {
      const swiperContainer = this.shadow.querySelector('swiper-container')

      swiperContainer!.innerHTML = ''

      this.products.forEach((product) => {
        const swiperSlide = document.createElement('swiper-slide')

        const productCardTag = new ProductCard(product, { page: 'catalog' })
        const addToCartParams = this.getAddToCartParams(product._id)
        const addToCartTag = new AddToCart(addToCartParams)
        addToCartTag.slot = 'children'
        productCardTag.appendChild(addToCartTag)
        swiperSlide.appendChild(productCardTag)

        swiperContainer.appendChild(swiperSlide)
      })
    }
  }

  private getAddToCartParams(productId: string) {
    const { getState } = useProductStore
    const { products } = getState()
    const params = {
      label: 'В корзину',
      active: true,
      productId: productId,
    }
    if (products.includes(productId)) {
      params.label = 'Уже в корзине'
      params.active = false
      return params
    }
    return params
  }

  private sliderNavigation() {
    const swiperEl = this.shadow.querySelector('swiper-container')
    const prevBtn = this.shadow.querySelector('.prev-button')
    const nextBtn = this.shadow.querySelector('.next-button')

    prevBtn.addEventListener('click', () => {
      swiperEl.swiper.slidePrev()
    })

    nextBtn.addEventListener('click', () => {
      swiperEl.swiper.slideNext()
    })

    const params = {
      slidesPerView: 'auto',
      spaceBetween: 30,
    }

    Object.assign(swiperEl, params)
  }
}

export { Slider }
