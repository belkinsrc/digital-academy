import { getState } from "../../../shared/api/zustand.js";
import { createUrlBuilder, commonComponentProps } from "../../../shared/lib/index.js";
import { CourseInformation } from "../../../shared/ui/course-information/index.js";

import { DeleteFromCart } from "../../../features/deleteFromCart/index.js";

import { Card } from "../../../entities/card/index.js";

export class CartProductsModel {
    static instance;

    static selectors = {
        instanceSelector: "[data-js-cart-products]",
        cardsContainer: "[data-js-cart-products-container]"
    }

    constructor() {
        this.node = document.querySelector(CartProductsModel.selectors.instanceSelector);
        CartProductsModel.instance = this;

        if (CartProductsModel.instance.node) {
            this.renderProductCards();
        }
    }

    renderProductCards() {
        (async () => {
            const cardsContainer = this.node.querySelector(CartProductsModel.selectors.cardsContainer);
            cardsContainer.innerHTML = "";

            const { productArray } = { ...getState() };

            const data = await this.fetchProductCards(productArray);

            if (data.length === 0) {
                cardsContainer.innerHTML =
                    `<h2 class="${commonComponentProps.getCN("cart-products", "empty")}">
                        Корзина пуста :(
                    </h2>`;
            } else {
                data.forEach((dataItem) => {
                    cardsContainer.innerHTML += Card({
                        data: dataItem,
                        features: {
                            deleteFromCart: DeleteFromCart(dataItem.idProduct)
                        },
                        children: {
                            courseInfo: CourseInformation("card")
                        },
                        extraClasses: { page: "cart" }
                    })
                })
            }
        })()
    }

    async fetchProductCards(productIds) {
        const url = createUrlBuilder("/cart/productCards")
            .addQueryParam("productIds", productIds)
            .build()

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }
}