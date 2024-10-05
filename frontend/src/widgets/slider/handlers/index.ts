import { IProduct } from '@/shared/api'
import { Slider } from '../ui'

class SliderEventHandler {
  private readonly slider: Slider

  constructor(slider: Slider) {
    this.slider = slider
  }

  handleEvent(event: Event) {
    switch (event.type) {
      case 'setSliderProducts':
        this.handleSetSliderProducts(event)
        break
    }
  }

  private handleSetSliderProducts(event: Event) {
    const customEvent = event as CustomEvent<IProduct[]>
    this.slider.products = customEvent.detail
    this.slider.renderProducts()
  }
}

export { SliderEventHandler }
