import { createUrlBuilder } from "../../../shared/lib/index.js";
import { CourseInformation } from "../../../shared/ui/course-information/index.js";

import { useCardStore } from "../../../features/addToCart/model/AddToCartModel.js";
import { DeleteFromCart } from "../../../features/deleteFromCart/index.js";

import { Card } from "../../../entities/card/index.js";

export class CartProductsModel {
    static cardsContainer = document.querySelector(".cart-products__container");

    constructor() {
        if (CartProductsModel.cardsContainer) {
            CartProductsModel.init();
        }
    }

    static async init() {
        const { getState } = useCardStore;

        const productIds = getState().productArray;

        const data = await CartProductsModel.fetchProductCards(productIds);

        this.cardsContainer.innerHTML = "";

        data.forEach((dataItem) => {
            this.cardsContainer.innerHTML += Card({
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

    static async fetchProductCards(productIds) {
        const url = createUrlBuilder("/cart")
            .addQueryParam("productIds", productIds)
            .build()

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }
}