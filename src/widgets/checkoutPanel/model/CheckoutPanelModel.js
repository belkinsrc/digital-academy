import { getState } from "../../../shared/api/zustand.js";
import { createUrlBuilder } from "../../../shared/lib/index.js";

export class CheckoutPanelModel {
    static instance;

    static selectors = {
        instanceSelector: ".checkout-panel",
        productCountSelector: ".checkout-panel__product-count",
        totalPriceSelector: ".total-price",
        checkoutButton: "[data-checkout-btn]"
    }

    constructor() {
        if (CheckoutPanelModel.instance) {
            return CheckoutPanelModel.instance;
        }

        this.node = document.querySelector(CheckoutPanelModel.selectors.instanceSelector);
        CheckoutPanelModel.instance = this;

        if (CheckoutPanelModel.instance.node) {
            this.renderOrderData();
            this.onClickCheckout();
        }
    }

    renderOrderData() {
        const productCount = this.node.querySelector(CheckoutPanelModel.selectors.productCountSelector);
        const totalPriceElements = this.node.querySelectorAll(CheckoutPanelModel.selectors.totalPriceSelector);

        const { productArray } = getState();

        this.fetchDataProductCards(productArray)
            .then(checkoutInfo => {
                if (checkoutInfo.productCount <= 0) {
                    const checkoutBtn = document.querySelector(CheckoutPanelModel.selectors.checkoutButton);
                    checkoutBtn.classList.add("button_disabled");
                }

                totalPriceElements.forEach(elem => {
                    elem.textContent = `${checkoutInfo.totalPrice} ₽`;
                })
                productCount.textContent = `Товары (${checkoutInfo.productCount})`;
            })
            .catch(error => console.error("Произошла ошибка: " + error));
    }

    onClickCheckout() {
        const checkoutBtn = document.querySelector(CheckoutPanelModel.selectors.checkoutButton);
        checkoutBtn.addEventListener("click", () => {
            const { clearStore } = getState();
            clearStore();
        });
    }

    async fetchDataProductCards(productIds) {
        const url = createUrlBuilder("/cart/checkoutInfo")
            .addQueryParam("productIds", productIds)
            .build()

        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Произошла ошибка: " + error);
        }

    }
}