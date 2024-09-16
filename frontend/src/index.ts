import '@webcomponents/custom-elements/src/native-shim.js'
import './style.scss'

import { Breadcrumbs } from '@/shared/ui'
import { CourseInfo } from '@/shared/ui'
import { ProductCard } from './entities/product-card'
import { FilterCategory } from './entities/filter-category'
import { AddToCart } from './features/add-to-cart'
import { Header } from './widgets/header'
import { Footer } from './widgets/footer'
import { ProductFilter } from './widgets/product-filter'
import { Menu } from './widgets/menu'
import { Logo } from './widgets/logo'
import { MenuItem } from './widgets/menu-item'
import { CartButton } from './widgets/cart-button'
import { CartProducts } from './widgets/cart-products'
import { CheckoutPanel } from './widgets/checkout-panel'
import { AboutUs } from './widgets/aboutUs'
import { CatalogPage } from './pages/catalog'

import { AddToCartModel } from './features/add-to-cart'
import { ProductFilterModel } from './widgets/product-filter'
import { initRouter } from './app/router'
import { routes } from './app/router'
import { CartPage } from './pages/cart'
import { MainPage } from './pages/main'
import { App } from './app'
import { NotFoundPage } from './pages/not-found'
import { CartProductsModel } from './widgets/cart-products/model'
import { DeleteFromCart } from './features/delete-from-cart'
import { DeleteFromCartModel } from './features/delete-from-cart/model'
import { CheckoutPanelModel } from './widgets/checkout-panel/model'
import { SliderModel } from './widgets/slider/model'
import { Slider } from './widgets/slider/ui'
import { ThanksPage } from './pages/thanks'

customElements.define('app-slider', Slider)
customElements.define('product-card', ProductCard)
customElements.define('add-to-cart', AddToCart)
customElements.define('delete-from-cart', DeleteFromCart)
customElements.define('product-filter', ProductFilter)
customElements.define('filter-category', FilterCategory)
customElements.define('app-header', Header)
customElements.define('app-menu', Menu)
customElements.define('app-logo', Logo)
customElements.define('menu-item', MenuItem)
customElements.define('cart-button', CartButton)
customElements.define('app-footer', Footer)
customElements.define('course-info', CourseInfo)
customElements.define('page-breadcrumbs', Breadcrumbs)
customElements.define('cart-products', CartProducts)
customElements.define('checkout-panel', CheckoutPanel)
customElements.define('about-us', AboutUs)
customElements.define('catalog-page', CatalogPage)
customElements.define('cart-page', CartPage)
customElements.define('main-page', MainPage)
customElements.define('not-found-page', NotFoundPage)
customElements.define('thanks-page', ThanksPage)
customElements.define('my-app', App)

// HMR active
if (module.hot) {
  module.hot.accept()
}

AddToCartModel.getInstance()
DeleteFromCartModel.getInstance()
ProductFilterModel.getInstance()
CartProductsModel.getInstance()
CheckoutPanelModel.getInstance()
SliderModel.getInstance()

const root = document.getElementById('app')
root.innerHTML = '<my-app></my-app>'

initRouter(routes)
