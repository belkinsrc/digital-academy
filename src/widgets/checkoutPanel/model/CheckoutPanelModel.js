import { getState } from "../../../shared/api/zustand.js";
import { createUrlBuilder } from "../../../shared/lib/index.js";

export class CheckoutPanelModel {
    static instance;

    static selectors = {
        instanceSelector: ".checkout-panel",
        productCountSelector: ".checkout-panel__product-count",
        totalPriceSelector: ".total-price"
    }

    constructor() {
        if (CheckoutPanelModel.instance) {
            return CheckoutPanelModel.instance;
        }

        this.node = document.querySelector(CheckoutPanelModel.selectors.instanceSelector);
        this.productCount = 0;
        this.totalPrice = 0;
        CheckoutPanelModel.instance = this;

        if (CheckoutPanelModel.instance.node) {
            this.renderOrderData();
        }
    }

    renderOrderData() {
        this.setOrderData();

        setTimeout(() => {
            const productCount = this.node.querySelector(CheckoutPanelModel.selectors.productCountSelector);
            const totalPriceElements = this.node.querySelectorAll(CheckoutPanelModel.selectors.totalPriceSelector);

            totalPriceElements.forEach(elem => {
                elem.textContent = `${this.totalPrice} ₽`;
            })
            productCount.textContent = `Товары (${this.productCount})`;
        }, 100);
    }

    setOrderData() {
        (async () => {
            const { productArray } = { ...getState() };

            const data = await this.fetchDataProductCards(productArray);

            data.forEach(productData => {
                this.productCount += 1;
                this.totalPrice += productData.price;
            })
        })()
    }

    async fetchDataProductCards(productIds) {
        const url = createUrlBuilder("/cart")
            .addQueryParam("productIds", productIds)
            .build()

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }
}