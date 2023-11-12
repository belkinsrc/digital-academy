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
        CheckoutPanelModel.instance = this;

        if (CheckoutPanelModel.instance.node) {
            this.renderOrderData();
        }
    }

    renderOrderData() {
        (async () => {
            const productCount = this.node.querySelector(CheckoutPanelModel.selectors.productCountSelector);
            const totalPriceElements = this.node.querySelectorAll(CheckoutPanelModel.selectors.totalPriceSelector);

            const { productArray } = { ...getState() };

            const data = await this.fetchDataProductCards(productArray);

            totalPriceElements.forEach(elem => {
                elem.textContent = `${data.totalPrice} ₽`;
            })
            productCount.textContent = `Товары (${data.productCount})`;
        })()
    }

    async fetchDataProductCards(productIds) {
        const url = createUrlBuilder("/cart/checkoutInfo")
            .addQueryParam("productIds", productIds)
            .build()

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }
}