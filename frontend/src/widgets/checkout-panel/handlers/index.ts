import { ICheckoutPanelInfo } from '../types'
import { CheckoutPanel } from '../ui'

class CheckoutPanelEventHandler {
  private readonly checkoutPanel: CheckoutPanel

  constructor(checkoutPanel: CheckoutPanel) {
    this.checkoutPanel = checkoutPanel
  }

  handleEvent(event: Event) {
    switch (event.type) {
      case 'setCheckoutPanelInfo':
        this.handleSetCheckoutPanelInfo(event)
        break
    }
  }

  private handleSetCheckoutPanelInfo(event: Event) {
    const customEvent = event as CustomEvent<ICheckoutPanelInfo>
    const info = customEvent.detail
    this.checkoutPanel.info = info
    this.checkoutPanel.renderInfo()
    this.checkoutPanel.updateButton()
  }
}

export { CheckoutPanelEventHandler }
